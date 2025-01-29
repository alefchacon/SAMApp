from django.shortcuts import render
from rest_framework.exceptions import ValidationError

from django.http import Http404, JsonResponse
from .serializers import PhotoSheetSerializer
from . import models
from rest_framework import viewsets, status, permissions
from django.shortcuts import get_object_or_404
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import exception_handler
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema

from principal import settings

class PhotoSheetViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = models.PhotoSheet.objects.all()
    serializer_class = PhotoSheetSerializer 
    
    def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'message': 'Ha ocurrido un error inesperado.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'message': 'La ficha fotográfica no fue encontrada.'}
        return response
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [permissions.IsAuthenticatedOrReadOnly()]
        return [permissions.IsAuthenticated()]

    @extend_schema(
    description="Obtiene una lista de fichas fotogra1ficas",
        responses={
            200: 'Lista de elementos contribuidores en formato JSON.',
        }
    )
    def list(self, request):
        sheets = models.PhotoSheet.objects.all()
        serializer = self.serializer_class(sheets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @extend_schema(
    description="Obtiene una especie por medio de su id.",
        responses={
            200: 'Ficha fotográfica en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El especie no fue encontrado.'
        }
    )
    def get_id(self, pk):
       try: 
        response = get_object_or_404(models.PhotoSheet, id=pk)
        serializer = self.serializer_class(response)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
       except Http404:
        error_data = 'La ficha fotográfica no fue encontrada.'
        return JsonResponse({"message": error_data}, status=status.HTTP_404_NOT_FOUND)
   
    @extend_schema(
    description="Crear una nueva ficha fotográfica.",
        responses={
            201: 'Mensaje de éxito al guardar una ficha fotográfica en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
    def create(self, request):
        serializer = self.serializer_class(data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            headers = self.get_success_headers(serializer.data)
            success_message = "La ficha fotográfica fue guardada con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data}, status=status.HTTP_201_CREATED, headers=headers)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
    description="Actualizar una ficha fotográfica.",
        responses={
            200: 'Mensaje de éxito al actualizar una ficha fotográfica en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La ficha fotográfica no fue encontrado.'
        }
    )
    def update(self, request, pk=None):
        try:
            photosheet = self.queryset.get(pk=pk)
        except models.PhotoSheet.DoesNotExist:
            return JsonResponse({"error": "La ficha fotográfica no fue encontrada"}, status=status.HTTP_404_NOT_FOUND)

        serializer = PhotoSheetSerializer(photosheet, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            if 'sheet' in request.data and photosheet.sheet:
                photosheet.sheet.delete()

            serializer.save()
            success_message = "La ficha fotográfica fue actualizada con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail
            errors = {key: str(value[0]) for key, value in error_details.items()} 
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)

    @extend_schema(
    description="Eliminar una ficha fotográfica.",
        responses={
            204: 'Mensaje de éxito al eliminar una ficha fotográfica en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - La ficha fotográfica no fue encontrado.'
        }
    )
    def delete(self, request, primaryKey):
        try:
            photosheet = self.queryset.get(id=primaryKey)
        except models.PhotoSheet.DoesNotExist:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        photosheet.image.delete()
        photosheet.delete()
        success_message = "La ficha fotográfica fue eliminada "
        return JsonResponse({"message": success_message}, status=status.HTTP_204_NO_CONTENT)
