
from django.http import Http404, JsonResponse
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from .serializers import SpecieSerializer, SpecimenSerializer, ContributorSerializer, ContributorRoleSerializer,LocationSerializer, ContributorSpecimenSerializer
from . import models
from django.db import transaction
from rest_framework import viewsets
from rest_framework import status
from rest_framework import permissions
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework.views import exception_handler
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.utils import extend_schema
from django.db.models.functions import Concat
from django.db.models import Value
from django.db.models import Count
from django.db.models.functions import Extract, TruncMonth, TruncYear

import json
import os
from django.conf import settings 
from django.http import FileResponse
from django.db.models import Q

class SpecieViewSet(viewsets.ModelViewSet):
    queryset = models.Specie.objects.all()
    serializer_class = SpecieSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in [
            'get_by_gender', 
            'get_by_orden', 
            'get_by_scientific_name', 
            'get_by_family', 
            'get_by_subspecie', 
            'get_specimen_list_visitor', 
            'list', 
            'get_ranks_preview', 
            'get_ordens', 
            'get_taxon_by_name',
            'search_species',
            'get_visitor_metrics_by_taxon'
        ]:
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]

    def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'error': 'La especie no fue encontrada.'}
        return response
    
    @extend_schema(
    description="Obtiene una especie por medio de su id.",
        responses={
            200: 'Especie en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El especie no fue encontrado.'
        }
    )
    def get(self, request, pk=None):
        try:
            specie = self.queryset.get(pk=pk)
            serializer = SpecieSerializer(specie)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except models.Specie.DoesNotExist:
            error_data ={'error': 'La especie no fue encontrada.'};
            return JsonResponse(error_data, status=status.HTTP_404_NOT_FOUND)
        
    @extend_schema(
    description="Obtiene una lista de todos los rangos taxonómicos registrados.",
        responses={
            200: 'Lista en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El especie no fue encontrado.'
        }
    )

    def get_ranks_preview(self, request):
        size = request.query_params.get('size', 5)
        try:
            size = int(size) if size else None
        except ValueError:
            size = 5
        taxa_by_rank = self.get_taxa(size)
        for rank, taxa in taxa_by_rank.items():
            taxa_by_rank[rank] = sorted([value for value in taxa if value is not None and value is not ''])
            result = []
            for taxon in taxa:
                filter_kwargs = {f"{rank}__istartswith": taxon}
                species = models.Specie.objects.filter(**filter_kwargs).order_by('gender', 'gender')
                result.append({
                    "rank": rank,
                    "taxon": taxon,
                    "specimen_count": models.Specimen.objects.filter(specie_id__in=[specie.id for specie in species]).count()
                })
                taxa_by_rank[rank] = result
        return JsonResponse(taxa_by_rank, status=status.HTTP_200_OK)
    
    def get_taxa(self, size = 5):
        return {
            'class_specie': list(models.Specie.objects.values_list('class_specie', flat=True).distinct()[:size]),
            'orden': list(models.Specie.objects.values_list('orden', flat=True).distinct()[:size]),
            'family': list(models.Specie.objects.values_list('family', flat=True).distinct()[:size]),
            'gender': list(models.Specie.objects.values_list('gender', flat=True).distinct()[:size]),
            'specie_specie': list(models.Specie.objects.values_list('specie_specie', flat=True).distinct()[:size]),
            'subspecie': list(models.Specie.objects.values_list('subspecie', flat=True).distinct()[:size]),
        }

    def get_taxon_by_name(self, request, taxon):
        hierarchy = ['orden', 'family', 'gender', 'specie_specie', 'subspecie']
        
        current_rank = None
        current_index = None
        for i, rank in enumerate(hierarchy):
            filter_kwargs = {f"{rank}__istartswith": taxon}
            if models.Specie.objects.filter(**filter_kwargs).exists():
                current_rank = rank
                current_index = i
                break
        
        if current_rank is None:
            return JsonResponse({"error": f"Taxon '{taxon}' not found in any rank"}, status=status.HTTP_200_OK, safe=False)
        

        parent_ranks = hierarchy[:current_index]
        children_ranks = hierarchy[current_index + 1:]
        
        filter_kwargs = {f"{current_rank}__istartswith": taxon}

        taxon_records = models.Specie.objects.filter(**filter_kwargs)
        
        parents = []
        if parent_ranks:
            first_record = taxon_records.values(*parent_ranks).first()
            for parent_rank in parent_ranks:
                parents.append({
                    "rank_name": parent_rank,
                    "taxon_name": first_record[parent_rank],
                })
        
        children = []
        for child_rank in children_ranks:
            child_values = list(taxon_records.values_list(child_rank, flat=True)
                            .distinct().exclude(**{f"{child_rank}__isnull": True}))
            for child in child_values:
                if child:
                    children.append({
                        "rank_name": child_rank,
                        "taxon_name": child,
                    })

        taxon_data = {
            'rank_name': current_rank,
            'taxon_name': taxon,
            'parent_ranks': parents,
            'children_ranks': children,
        }
        
        return JsonResponse(taxon_data, status=status.HTTP_200_OK, safe=False)
    
    def search_species(self, request):
        taxon_name = request.query_params.get('query', 'mammalia')
        specie_data = self.get_species_by_taxon(taxon_name)

        return JsonResponse(specie_data, status=status.HTTP_200_OK, safe=False)
    
    def get_visitor_metrics_by_taxon(self, request):
        taxon_name = request.query_params.get('query', 'mammalia')
        
        taxon_species = self.get_species_by_taxon(taxon_name)["species"]

        species_ids = [species['id'] for species in taxon_species]
        
        taxon_specimens = models.Specimen.objects.filter(
            specie_id__in=species_ids,
            colection_date__isnull=False
        )

        specimens_by_month = taxon_specimens.annotate(
            year=Extract('colection_date', 'year'),
            month=Extract('colection_date', 'month')
        ).values('year', 'month').annotate(
            count=Count('id')
        ).order_by('year', 'month')
        
        specimens_by_year = models.Specimen.objects.filter(
            specie_id__in=species_ids,
            colection_date__isnull=False
        ).annotate(
            year=Extract('colection_date', 'year')
        ).values('year').annotate(
            count=Count('id')
        ).order_by('year')
        
        # Format the response
        monthly_data = []
        for item in specimens_by_month:
            monthly_data.append({
                'year': item['year'],
                'month': item['month'],
                'count': item['count']
            })
        
        yearly_data = []
        for item in specimens_by_year:
            yearly_data.append({
                'year': item['year'],
                'count': item['count']
            })
        
        locations = models.Location.objects.filter(specimen__in=taxon_specimens)
        if not request.user.is_authenticated:
            states = [{
                "location": {
                    "state": location.state
                }
            } for location in locations]
        else:
            states = [{
                "location": {
                    "state": location.state,
                    "coordinates_cartesian_plane_x": location.coordinates_cartesian_plane_x,
                    "coordinates_cartesian_plane_y": location.coordinates_cartesian_plane_y,
                    "geographical_coordinates_x": location.geographical_coordinates_x,
                    "geographical_coordinates_y": location.geographical_coordinates_y,
                    "utm_region": location.utm_region,
                }
            } for location in locations]


        response = {
            'taxon_name': taxon_name,
            'specimens_by_month': monthly_data,
            'specimens_by_year': yearly_data,
            'specimens': states,
        }

        
        return JsonResponse(response, safe=False)

    def get_species_by_taxon(self, taxon_name):
        hierarchy = ['orden', 'family', 'gender', 'specie_specie']
        
        taxon_matches = []
        species = []
        for rank in hierarchy:
            matching_taxa = models.Specie.objects.filter(
                **{f"{rank}__icontains": taxon_name}
            ).values_list(rank, flat=True).distinct()
            if matching_taxa:
                taxon_matches.append({
                    "rank_name": rank,
                    "taxa_names": list(matching_taxa)
                })
            for taxon in matching_taxa:
                if taxon: 
                    species.append(list(models.Specie.objects.filter(**{rank: taxon}).values()))

        
        epithet_species = list(models.Specie.objects.annotate(
            epithet=Concat('gender', Value(' '), 'specie_specie', Value(' '), 'subspecie')
        ).filter(epithet__icontains=taxon_name).values())

        species.extend(epithet_species)

        all_species = []
        for species_list in species:
            if isinstance(species_list, list):
                all_species.extend(species_list)
            else:
                all_species.append(species_list)

        unique_species = {specie['id']: specie for specie in all_species}.values()
        return {
            "species": list(unique_species),
            "taxa": taxon_matches
        }
    
    def get_ordens(self, request, pk=None):
        orden_names = list(models.Specie.objects.values_list('orden', flat=True).distinct())
        species_list=[]      
        for orden_name in orden_names:
            species = models.Specie.objects.filter(orden__istartswith=orden_name).order_by('gender', 'gender')
            
            species_list.append({
                "rank_name": "orden",
                "taxon_name": orden_name,
                "specimen_count": models.Specimen.objects.filter(specie_id__in=[specie.id for specie in species]).count()
            })
        return JsonResponse(species_list, status=status.HTTP_200_OK, safe=False)
    
    def get_genders_by_family(self, request, family):
        gender_names = models.Specie.objects.filter(family__istartswith=family).order_by('family', 'gender').values().values_list('gender', flat=True).distinct()
        filters=[]      
        for gender_name in gender_names:
            species = models.Specie.objects.filter(gender__istartswith=gender_name).order_by('gender', 'gender')
            specie_names = list(species.values_list('specie_specie', flat=True).distinct())
            filters.append({
                "filter_name": gender_name,
                "species_count": species.count(),
                "children_names": specie_names,
                "specimen_count": models.Specimen.objects.filter(specie_id__in=[specie.id for specie in species]).count()
            })
        response={
            "filter_type": "gender",
            "filters": filters
        }
        return JsonResponse(response, status=status.HTTP_200_OK, safe=False)

    
    @extend_schema(
    description="Obtiene una lista de especie por la familia.",
        responses={
            200: 'Lista de elementos especie en formato JSON.',
        }
    )
    def get_by_family(self, request, family):
        self.permission_classes = [AllowAny]
        if family is None or family == '':
            error_data = {'error': 'El parámetro "family" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        species_list = models.Specie.objects.filter(family__istartswith=family).order_by('family', 'gender').values()
        species_data = list(species_list)  
        return JsonResponse(species_data, safe=False)

    @extend_schema(
    description="Obtiene una lista de especie por la género.",
        responses={
            200: 'Lista de elementos especie en formato JSON.',
        }
    )
    def get_by_gender(self, request, gender):
        self.permission_classes = [AllowAny]
        if gender is None or gender == '':
            error_data = {'error': 'El parámetro "gender" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        species_list = models.Specie.objects.filter(gender__istartswith=gender).order_by('gender', 'gender').values()
        species_data = list(species_list) 
        return JsonResponse(species_data, safe=False)

    @extend_schema(
    description="Obtiene una lista de especie por el orden.",
        responses={
            200: 'Lista de elementos especie en formato JSON.',
        }
    )
    def get_by_orden(self, request, orden):
        self.permission_classes = [AllowAny]
        if orden is None or orden == '':
            error_data = {'error': 'El parámetro "orden" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        species_list = models.Specie.objects.filter(orden__istartswith=orden).order_by('orden', 'gender').values()
        species_data = list(species_list)  
        return JsonResponse(species_data, safe=False)

    @extend_schema(
    description="Obtiene una lista de especie por la nombre científico.",
        responses={
            200: 'Lista de elementos especie en formato JSON.',
        }
    )
    def get_by_scientific_name(self, request, scientific_name):
        self.permission_classes = [AllowAny]
        if scientific_name is None or scientific_name == '':
            error_data = {'error': 'El parámetro "scientific_name" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        
        species_list = list(models.Specie.objects.annotate(
            epithet=Concat('gender', Value(' '), 'specie_specie', Value(' '), 'subspecie')
        ).filter(epithet__icontains=scientific_name).values())
        species_data = species_list  
        return JsonResponse(species_data, safe=False)
    
    @extend_schema(
    description="Obtiene una lista de especie por la subespecie.",
        responses={
            200: 'Lista de elementos especie en formato JSON.',
        }
    )
    def get_by_subspecie(self, request, subspecie):
        self.permission_classes = [AllowAny]
        if subspecie is None or subspecie == '':
            error_data = {'error': 'El parámetro "subspecie" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        species_list = models.Specie.objects.filter(subspecie__istartswith=subspecie).order_by('subspecie', 'gender').values()
        species_data = list(species_list)  
        return JsonResponse(species_data, safe=False)

    @extend_schema(
        description="Obtiene una lista de elementos especie.",
        responses={200: 'Lista de elementos especie en formato JSON.'}
    )
    def list(self, request):
        species = models.Specie.objects.all()
        serializer = SpecieSerializer(species, many=True)
        for data in serializer.data:
            data['id'] = species.get(id=data['id']).id
        return JsonResponse(serializer.data, safe=False)

    @extend_schema(
    description="Crear una nueva especie.",
    responses={
        201: 'Mensaje de éxito al guardar una especie en formato JSON.',
        401: 'No autorizado - La autenticación ha fallado.',
        400: 'Bad request - La petición es inválida.'
    }
)
    def create(self, request):
        self.permission_classes = [IsAuthenticated]
        serializer = self.serializer_class(data=request.data)
        
        if serializer.is_valid():
            instance = serializer.save()
            specie_id = instance.id
            headers = self.get_success_headers(serializer.data)
            message = "La especie fue guardada con éxito"
            return JsonResponse({"message": message, "specie_id": specie_id}, status=status.HTTP_201_CREATED, headers=headers)
        
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
    @extend_schema(
    description="Actualizar una especie.",
        responses={
            200: 'Mensaje de éxito al actualizar una especie en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La especie no fue encontrado.'
        }
    )
    def update(self, request, pk):
        try:
            specie = self.queryset.get(pk=pk)
        except models.Specie.DoesNotExist:
            return JsonResponse({"error": "La especie no fue encontrada"}, status=status.HTTP_404_NOT_FOUND)
        serializer = SpecieSerializer(specie, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "La especie fue actualizado con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail 
            errors = {key: str(value[0]) for key, value in error_details.items()} 
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)


    @extend_schema(
    description="Eliminar una especie.",
        responses={
            204: 'Mensaje de éxito al eliminar una especie en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La especie no fue encontrado.'
        }
    )
    def delete(self, request, primaryKey):
        self.permission_classes = [IsAuthenticated]
        try:
            specie = self.queryset.get(primaryKey=primaryKey)
        except models.Specie.DoesNotExist:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        specie.delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)
    
    @extend_schema(
        description="Obtiene una lista de especimenes de una especie .",
        responses={200: 'Lista de elementos especie en formato JSON.'}
    )
    @action(detail=False, methods=['get'])
    def get_specimen_list_visitor(self, request, id_specie):
        specimen_list = models.Specimen.objects.filter(specie=id_specie)
        data = []
        for specimen in specimen_list:
            location = models.Location.objects.get(specimen=specimen.id)
            data.append({
                'colection_date': specimen.colection_date,
                'state': location.state

        })
        return JsonResponse(data, safe=False)
    
    @extend_schema(
        description="Obtiene una lista de especimenes de una especie para un académico.",
        responses={200: 'Lista de elementos especie en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',}
    )
    @action(detail=False, methods=['get'])
    def get_specimen_list_academic(self, request, id_specie):
        self.permission_classes = [IsAuthenticated]
        specimen_list = models.Specimen.objects.filter(specie=id_specie)
             
        data = []
        for specimen in specimen_list:
            location = models.Location.objects.get(specimen=specimen.id)
            data.append({
                'catalog_id': specimen.catalog_id,
                'colection_date': specimen.colection_date,
                'sex': specimen.sex,
                'number_embryos': specimen.number_embryos,
                'state': location.state
            })
        return JsonResponse(data, safe=False)

    @extend_schema(
        description="Obtiene una lista de especimenes de una especie para personal técnico.",
        responses={200: 'Lista de elementos especie en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',}
    )
    def specimen_list(self, request, id_specie):
        self.permission_classes = [IsAuthenticated]
        specimen_list = models.Specimen.objects.filter(specie=id_specie)
        serializer = SpecimenSerializer(specimen_list, many=True)
        return JsonResponse(serializer.data, safe=False) 
    

    @extend_schema(
        description="Registra especies con sus respectivos especímenes, y ubicaciones y colaboradores correspondientes.",
        responses={
            200: 'Mensaje de éxito al registrar la colección.',
            400: 'Bad request - La petición es inválida.',
            401: 'No autorizado - La autenticación ha fallado.',}
    )
    @transaction.atomic
    def migrate_collection(self, request):
        self.permission_classes = [IsAuthenticated]
        specie_array = json.loads(request.body)

        errors = self.get_migration_errors(specie_array=specie_array)

        if errors:
            transaction.set_rollback(True)
            return JsonResponse({'errors': errors, 'data': specie_array}, status=status.HTTP_400_BAD_REQUEST)

        for specie_json in specie_array:

            specie_model, _ = models.Specie.objects.get_or_create(
                gender=specie_json["gender"],
                family=specie_json["family"],
                orden=specie_json["orden"],
                specie_specie=specie_json["specie_specie"],
                class_specie=specie_json["class_specie"],
                subspecie=specie_json["subspecie"],
            )

            specimen_array = specie_json.pop('specimens', {})

            for specimen_json in specimen_array:
                location_json = specimen_json.pop('location', {})
                colector_json = specimen_json.pop('colector', {})
                preparator_json = specimen_json.pop('preparator', {})

                specimen_json['specie'] = specie_model
                specimen_model = models.Specimen.objects.create(**specimen_json)

                if location_json:
                    location_json['specimen'] = specimen_model
                    models.Location.objects.create(**location_json)

                if colector_json:
                    colector_model, _ = models.Contributor.objects.get_or_create(code=colector_json["code"])
                    models.ContributorSpecimen.objects.create(
                        specimen_id=specimen_model.id,
                        contributor_id=colector_model.id,
                        contributor_role_id=1
                    )

                if preparator_json:
                    preparator_model, _ = models.Contributor.objects.get_or_create(code=preparator_json["code"])
                    models.ContributorSpecimen.objects.create(
                        specimen_id=specimen_model.id,
                        contributor_id=preparator_model.id,
                        contributor_role_id=2
                    )

        return JsonResponse({'message': 'Colección importada exitosamente'}, status=status.HTTP_201_CREATED)
    
    def get_migration_errors(self, specie_array):
        
        errors = []
        
        for specie_json in specie_array:

            specie_serializer = SpecieSerializer(data=specie_json)

            if not specie_serializer.is_valid():
                errors.append({"specie": specie_json.get("gender", "Unknown"), "errors": specie_serializer.errors})
                
            specimen_array = specie_json.get('specimens', {})

            for specimen_json in specimen_array:
                location_data = specimen_json.get('location', {})
                colector_data = specimen_json.get('colector', {})
                preparator_data = specimen_json.get('preparator', {})

                specimen_serializer = SpecimenSerializer(data=specimen_json)
                
                specimen_errors = {}

                if not specimen_serializer.is_valid():
                    specimen_errors.update(specimen_serializer.errors)

                if location_data:
                    location_data['specimen'] = specimen_json.get("id") 
                    location_serializer = LocationSerializer(data=location_data)
                    if not location_serializer.is_valid():
                        for field, messages in location_serializer.errors.items():
                            specimen_errors.update({field : messages})

                if colector_data:
                    contributor_serializer = ContributorSerializer(data=colector_data)
                    if not contributor_serializer.is_valid():
                        for field, messages in contributor_serializer.errors.items():
                            specimen_errors.update({field : messages})
                
                if preparator_data:
                    contributor_serializer = ContributorSerializer(data=preparator_data)
                    if not contributor_serializer.is_valid():
                        for field, messages in contributor_serializer.errors.items():
                            specimen_errors.update({field : messages})

                if specimen_errors:
                    errors.append({
                        "specimen": specimen_json.get("catalog_id", "Unknown"),
                        "errors": specimen_errors
                    })
                    continue

        return errors;





    def get_migration_format(self, request):
        self.permission_classes = [IsAuthenticated]
        file_path = os.path.join(settings.MEDIA_ROOT, settings.FORMATS_URL, settings.MIGRATION_FORMAT_FILENAME)
        response = FileResponse(open(file_path, 'rb'))
        response['Content-Type'] = 'text/csv'
        response['Content-Disposition'] = f'attachment; filename="{settings.MIGRATION_FORMAT_FILENAME}"'
        return response


class SpecimenViewSet(viewsets.ModelViewSet):
   queryset = models.Specimen.objects.all()
   serializer_class = SpecimenSerializer
   permission_classes = [IsAuthenticated]
   authentication_classes = [JWTAuthentication]

   def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'error': 'El especímen no fue encontrado.'}
        return response
    
   @extend_schema(
    description="Obtiene un especimen por medio de su id.",
        responses={
            200: 'Especimen en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El especie no fue encontrado.'
        }
    )
   def get_id(self, pk):
       try: 
        response = get_object_or_404(models.Specimen, ip=pk)
        serializer = self.serializer_class(response)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
       except Http404:
        error_data = {'error': 'El especimén no fue encontrado.'}
        return JsonResponse(error_data, status=status.HTTP_404_NOT_FOUND)
   
   @extend_schema(
    description="Crear un nuevo espécimen.",
        responses={
            201: 'Mensaje de éxito al guardar un espécimen en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
   @transaction.atomic
   def create(self, request, *args, **kwargs):
        specimen_data = request.data
        location_data = specimen_data.pop('location', {})
        colector_data = specimen_data.pop('colector', {})
        preparator_data = specimen_data.pop('preparator', {})

        specimen_serializer = self.get_serializer(data=specimen_data)
        if not specimen_serializer.is_valid():
            transaction.set_rollback(True)
            return Response(specimen_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        specimen_instance = specimen_serializer.save()

        colector_data['specimen'] = specimen_instance.id
        preparator_data['specimen'] = specimen_instance.id
        location_data['specimen'] = specimen_instance.id

        location_serializer = LocationSerializer(data=location_data)
        if not location_serializer.is_valid():
            transaction.set_rollback(True)
            return Response(location_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        colector_serializer = ContributorSpecimenSerializer(data=colector_data)
        if not colector_serializer.is_valid():
            transaction.set_rollback(True)
            return Response(colector_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        preparator_serializer = ContributorSpecimenSerializer(data=preparator_data)
        if not preparator_serializer.is_valid():
            transaction.set_rollback(True)
            return Response(preparator_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        models.Location.objects.create(**location_serializer.validated_data)
        models.ContributorSpecimen.objects.create(**colector_serializer.validated_data)
        models.ContributorSpecimen.objects.create(**preparator_serializer.validated_data)

        headers = self.get_success_headers(specimen_serializer.data)
        success_message = "El especimen fue guardado con éxito"
        return Response({
            "message": success_message,
            "specimen_id": specimen_instance.id
        }, status=status.HTTP_201_CREATED, headers=headers)
    
   @extend_schema(
    description="Actualizar un espécimen.",
        responses={
            200: 'Mensaje de éxito al actualizar una espécimen en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La espécimen no fue encontrado.'
        }
    )
   def update(self, request, pk=None):
        try:
            specimen = self.queryset.get(pk=pk)
        except models.Specimen.DoesNotExist:
            return JsonResponse({"error": "El especimen no fue encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = SpecimenSerializer(specimen, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "El especimen fue actualizado con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail  
            errors = {key: str(value[0]) for key, value in error_details.items()} 
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)
    
   @extend_schema(
    description="Eliminar un espécimen.",
        responses={
            204: 'Mensaje de éxito al eliminar una espécimen en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La espécimen no fue encontrado.'
        }
    )
   def delete(self, request, primaryKey):
        try:
            specimen = self.queryset.get(primaryKey=primaryKey)
        except models.Specimen.DoesNotExist:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        specimen.delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)
   

class ContributorViewSet(viewsets.ModelViewSet):
   queryset = models.Contributor.objects.all()
   serializer_class = ContributorSerializer
   authentication_classes = [JWTAuthentication]
   permission_classes = [IsAuthenticated]

   def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'error': 'El contribuidor no fue encontrado.'}
        return response
    
   @extend_schema(
    description="Obtiene una lista de contribuidores.",
        responses={
            200: 'Lista de elementos contribuidores en formato JSON.',
        }
    )
   def list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        response = {
            "message": "Yeah boi",
            "data": serializer.data
        }
        return JsonResponse(response, safe=False)

   @extend_schema(
    description="Obtiene un conribuidor por medio de su id.",
        responses={
            200: 'Contribuidor en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El contribuidor no fue encontrado.'
        }
    )
   def get_id(self, pk):
       response = get_object_or_404(models.Contributor, id=pk)
       serializer = self.serializer_class(response)
       return JsonResponse(serializer.data)
   
   @extend_schema(
    description="Crear un nuevo contribuidor.",
        responses={
            201: 'Mensaje de éxito al guardar un contribuidor en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
   def create(self, request):
        code = request.data.get('code')

        existing_user = models.Contributor.objects.filter(code=code)
        if existing_user:
            return JsonResponse({'message': 'Ya existe un contribuidor con este código.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=request.data)
        if (not serializer.is_valid()):
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        headers = self.get_success_headers(serializer.data)       
        success_message = "El contribuidor fue guardado con éxito"
        return JsonResponse({'message': success_message, 'data': serializer.data}, status=status.HTTP_201_CREATED, headers=headers)
    
   @extend_schema(
    description="Actualizar un contribuidor.",
        responses={
            200: 'Mensaje de éxito al actualizar un contribuidor en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El contribuidor no fue encontrado.'
        }
    )
   def update(self, request, pk=None):
        code = request.data.get('code')

        existing_user = models.Contributor.objects.filter(code=code)
        try:
            int_pk = int(pk)
        except (ValueError, TypeError):
            return JsonResponse({'message': 'El contribuidor no fue encontrado'}, status=status.HTTP_400_BAD_REQUEST)
        if existing_user and existing_user.first().id != int_pk:
            return JsonResponse({'message': 'Ya existe un contribuidor con este código.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            contributor = self.queryset.get(pk=pk)
        except models.Contributor.DoesNotExist:
            return JsonResponse({"error": "El contribuidor no fue encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = ContributorSerializer(contributor, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "El contribuidor fue actualizado con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail  
            errors = {key: str(value[0]) for key, value in error_details.items()} 
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)
    
   @extend_schema(
    description="Eliminar un contribuidor.",
        responses={
            204: 'Mensaje de éxito al eliminar un contribuidor en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El contribuidor no fue encontrado.'
        }
    )   
   def delete(self, request, pk):
        try:
            contributor = self.queryset.get(primaryKey=pk)
        except models.Contributor.DoesNotExist:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        contributor.delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)

   
class LocationViewSet(viewsets.ModelViewSet):
   queryset = models.Location.objects.all()
   serializer_class = LocationSerializer
   authentication_classes = [JWTAuthentication]
   permission_classes = [IsAuthenticated]
   
   def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'error': 'Ha ocurrido un error inesperado.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        if isinstance(exc, Http404):
            response.data = {'error': 'La ubicación del especímen no fue encontrada.'}
        return response
 
   @extend_schema(
    description="Obtiene una ubicación por medio de su id.",
        responses={
            200: 'Ubicación en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - La ubicación no fue encontrado.'
        }
    )
   def get_id(self, pk):
        location = get_object_or_404(models.Location, id=pk)
        serializer = self.serializer_class(location)
        return JsonResponse(serializer.data)

   @extend_schema(
    description="Crear una nueva ubicación.",
        responses={
            201: 'Mensaje de éxito al guardar una ubicación en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
   def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            instance = serializer.save()
            headers = self.get_success_headers(serializer.data)
            success_message = "La ubicación fue guardada con éxito"
            return JsonResponse({'message': success_message, 'location': serializer.data, 'id': instance.id}, status=status.HTTP_201_CREATED, headers=headers)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

   @extend_schema(
    description="Actualizar una ubicación.",
        responses={
            200: 'Mensaje de éxito al actualizar una ubicación en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La ubicación no fue encontrado.'
        }
    )
   def update(self, request, pk=None):
    try:
        location = self.queryset.get(pk=pk)
    except models.Location.DoesNotExist:
        return JsonResponse({"error": "La ubicación del especimen no fue encontrada"}, status=status.HTTP_404_NOT_FOUND)
    serializer = LocationSerializer(location, data=request.data, partial=True)
    try:
        serializer.is_valid(raise_exception=True)
        serializer.save()
        success_message = "La ubicación del especimen fue actualizada con éxito"
        return JsonResponse({"message": success_message, "data": serializer.data})
    except ValidationError as error:
        error_details = error.detail 
        errors = {key: str(value[0]) for key, value in error_details.items()} 
        return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

   @extend_schema(
    description="Eliminar una ubicación.",
        responses={
            204: 'Mensaje de éxito al eliminar una ubicación en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La ubicación no fue encontrado.'
        }
    ) 
   def delete(self, request, primaryKey):
    try:
        location = models.Location.objects.get(primaryKey=primaryKey)  
    except models.Location.DoesNotExist:
        return JsonResponse({"message": "La ubicación no fue encontrada"}, status=status.HTTP_404_NOT_FOUND)
    location.delete()
    success_message = "La ubicación de un especimen fue eliminada"
    return JsonResponse({"message": success_message}, status=status.HTTP_204_NO_CONTENT)
    

   @extend_schema(
    description="Obtiene una ubicación por medio de su id del espécimen.",
        responses={
            200: 'Ubicación en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - La ubicación no fue encontrado.'
        }
    )
   def get_specimen(self,request, specimen): 
        
        if specimen is None or  specimen == '':
            error_data = {'error': 'El parámetro "idSpecimen" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        location = models.Location.objects.filter(specimen=specimen).first()
        if location is None:
            return JsonResponse({'error': 'La ubicación del especímen no fue encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        location_data = {
            'id': location.id,
            'coordinates_cartesian_plane_x': location.coordinates_cartesian_plane_x,
            'coordinates_cartesian_plane_y': location.coordinates_cartesian_plane_y,
            'geographical_coordinates_x': location.geographical_coordinates_x,
            'geographical_coordinates_y': location.geographical_coordinates_y,
            'utm_region': location.utm_region,
            'msnm_google': location.msnm_google,
            'altitude': location.altitude,
            'institute_code': location.institute_code,
            'institute': location.institute,
            'specific_location': location.specific_location,
            'municipality': location.municipality,
            'state': location.state,
            'country': location.country,
        }
        return JsonResponse(location_data, status=status.HTTP_200_OK)


class ContributorRoleViewSet(viewsets.ModelViewSet):
    queryset = models.ContributorRole.objects.all()
    serializer_class = ContributorRoleSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def handle_exception(self, exc):
        response = super().handle_exception(exc)
        if isinstance(exc, Http404):
            response.data = {'error': 'El rol del contribuidor no fue encontrado.'}
        return response

    @extend_schema(
    description="Obtiene una lista de contribuidor por el especimen",
        responses={
            200: 'Lista de elementos contribuidores en formato JSON.',
        }
    )
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
    description="Obtiene un conribuidor por medio de su id.",
        responses={
            200: 'Contribuidor en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El contribuidor no fue encontrado.'
        }
    )
    def get_id(self, pk):
       response = get_object_or_404(models.ContributorRole, id=pk)
       serializer = self.serializer_class(response)
       return JsonResponse(serializer.data)


class ContributorSpecimenViewSet(viewsets.ModelViewSet):
    queryset = models.ContributorSpecimen.objects.all()
    serializer_class = ContributorSpecimenSerializer
    
    def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'error': 'Los contribuidores de un especímen no fueron encontrados.'}
        return response

    @extend_schema(
    description="Crear una nueva relación de contribuidores al espécimen.",
        responses={
            201: 'Mensaje de éxito al guardar un contribuidores al espécimen en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )   
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "Se agregaron colaboradores al espécimen"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail
            errors = {key: str(value[0]) for key, value in error_details.items()}
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
    description="Actualizar un contribuidor en un espécimen.",
        responses={
            200: 'Mensaje de éxito al actualizar un contribuidor en un especimén en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El contribuidor no fue encontrado.'
        }
    )
    def update(self, request, pk=None):
            try:
                contributor_specimen = self.queryset.get(pk=pk)
            except models.ContributorSpecimen.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND)
            serializer = ContributorSpecimenSerializer(contributor_specimen, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                sucess_message = "Los colaboradores se han actualizado con éxito"
                return JsonResponse({'message': sucess_message, "data": serializer.data}, status= status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
      
    @extend_schema(
    description="Eliminar un contribuidor de un espécimen.",
        responses={
            204: 'Mensaje de éxito al eliminar un contribuidor en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El contribuidor no fue encontrado.'
        }
    ) 
    def delete(self, request, pk):
            try:
                contributor_specimen = self.queryset.get(primaryKey=pk)
            except models.ContributorSpecimen.DoesNotExist:
                return JsonResponse(status=status.HTTP_404_NOT_FOUND)
            contributor_specimen.delete()
            return JsonResponse(status=status.HTTP_204_NO_CONTENT)
    
    @extend_schema(
        description="Obtiene una lista de contribuidores de un especimen.",
        responses={
            200: 'Lista de elementos contribuidores en formato JSON.',
        }
    )
    def get_specimen_id(self, request, specimen_id):
        if specimen_id is None:
            error_data = {'error': 'El parámetro "specimen_id" no fue proporcionado o es inválido.'}
            return JsonResponse(error_data, status=status.HTTP_400_BAD_REQUEST)
        contributorspecimen_list = models.ContributorSpecimen.objects.filter(specimen_id=specimen_id).values();
        contributorspecimen_data = list(contributorspecimen_list)
        return JsonResponse(contributorspecimen_data,safe=False)
    
   