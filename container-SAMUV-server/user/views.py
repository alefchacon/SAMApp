

# Create your views here.
from django.http import Http404, JsonResponse
from rest_framework.exceptions import ValidationError
from django.db import transaction

from .serializers import AcademicSerializer, TechnicalPersonSerializer, RequestSerializer
from SAMastozoologicaServer.serializers import UserSerializer
from . import models
from rest_framework import viewsets
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from rest_framework.permissions import  IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import exception_handler
from drf_spectacular.utils import extend_schema
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
import secrets
import string
import resend
import os

class AcademicViewSet(viewsets.ModelViewSet):
    serializer_class = AcademicSerializer
    queryset = models.Academic.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated] 
    
    def get_permissions(self):
        # Check the current action and return the appropriate permission classes
        if self.action in ['create']:
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]
    def handle_exception(self, exc):
        response = exception_handler(exc, self.request)

        if response is None:
            return  Response({'error': 'Ha ocurrido un error inesperado.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        # Si la excepción es una NotFound, personalizamos el mensaje
        if isinstance(exc, Http404):
            response.data = {'error': 'El académico no fue encontrado.'}

        return response
    
    @extend_schema(
    description="Obtiene una lista de elementos académicos.",
        responses={
            200: 'Lista de elementos académicos en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - La lista de elementos académicos no está disponible.'
        }
    )
    def academic_list(self, request):
        serializer = self.serializer_class(self.queryset, many=True)
        return JsonResponse(serializer.data)

    @extend_schema(
    description="Obtiene un académico por medio de su id.",
        responses={
            200: 'Académico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El académico no fue encontrado.'
        }
    )
    def get_id(self, pk):
       response = get_object_or_404(models.Academic, id=pk)
       serializer = self.serializer_class(response)
       return JsonResponse(serializer.data)
   
    @extend_schema(
    description="Crear un nuevo académico.",
        responses={
            201: 'Mensaje de éxito al guardar un académico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            success_message = "El académico fue guardado con éxito"
            headers = self.get_success_headers(serializer.data)
            return JsonResponse({'message': success_message}, status=status.HTTP_201_CREATED, headers=headers)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
    description="Actualizar un académico.",
        responses={
            200: 'Mensaje de éxito al actualizar un académico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El académico no fue encontrado.'
        }
    )
    def update(self, request, pk=None):
        try:
            academic = self.queryset.get(pk=pk)
        except models.Academic.DoesNotExist:
            return JsonResponse({"error": "El académico no fue encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AcademicSerializer(academic, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "El académico fue actualizado con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail  
            errors = {key: str(value[0]) for key, value in error_details.items()} 
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)
    
    @extend_schema(
    description="Eliminar un académico.",
        responses={
            204: 'Mensaje de éxito al eliminar un académico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El académico no fue encontrado.'
        }
    )
    def delete(self, request, primaryKey):
        try:
            academic = self.queryset.get(primaryKey=primaryKey)
        except models.Academic.DoesNotExist:
            return JsonResponse(status=status.HTTP_404_NOT_FOUND)
        academic.delete()
        return JsonResponse(status=status.HTTP_204_NO_CONTENT)


class TechnicalPersonViewSet(viewsets.ModelViewSet):
    serializer_class =TechnicalPersonSerializer
    queryset = models.TechnicalPerson.objects.all()
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]  
    
    def handle_exception(self, exc):
        response = exception_handler(exc, self.request)
        if response is None:
            return  Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'error': 'El personal técnico no fue encontrado.'}
        return response
    
    @extend_schema(
    description="Obtiene un personal técnico por medio de su id.",
        responses={
            200: 'Personal técnico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El personal técnico no fue encontrado.'
        }
    )
    def get_id(self, pk):
       response = get_object_or_404(models.TechnicalPerson, id=pk)
       serializer = self.serializer_class(response)
       return JsonResponse(serializer.data) #
    
    @extend_schema(
    description="Obtiene listado de técnicos.",
        responses={
            200: 'Personal técnico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - El personal técnico no fue encontrado.'
        }
    )
    def list(self, pk):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response = {
            "message": "",
            "data": serializer.data
        }
        return Response(response, status=status.HTTP_200_OK)
   
    @extend_schema(
    description="Crear una nuevo personal técnicco.",
        responses={
            201: 'Mensaje de éxito al guardar un personal técnico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
    def create(self, request):
        email = request.data.get('user', {}).get('email')
        with transaction.atomic():
            existing_user = models.User.objects.filter(email=email)
            if existing_user:
                return JsonResponse({'message': existing_user}, status=status.HTTP_400_BAD_REQUEST, safe=False)
      
        serializer = self.serializer_class(data=request.data)

        username = request.data["user"]["email"].split("@")[0]
        request.data["user"]["username"] = username

        alphabet = string.ascii_letters + string.digits
        random_password = ''.join(secrets.choice(alphabet) for _ in range(12))
        
        request.data["user"]["password"] = random_password

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # serializer.save()

        resend.api_key = os.environ["RESEND_API_KEY"]

        params: resend.Emails.SendParams = {
            "from": f'Biocolección IIB-UV <{os.environ["RESEND_EMAIL"]}>',
            "to": ["zs20015745@estudiantes.uv.mx"],
            "subject": "Bienvenido a la biocolección",
            'text': "sadf",
        }

        resend.Emails.send(params)
        return JsonResponse({"message": email}, status=status.HTTP_400_BAD_REQUEST, safe=False)

        headers = self.get_success_headers(serializer.data)
        message = "El personal técnico fue registrado con éxito"
        return JsonResponse({
            'message':message,
            'data': serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)

    
    @extend_schema(
    description="Actualizar un personal técnico.",
        responses={
            200: 'Mensaje de éxito al actualizar un personal técnico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El personal técnico no fue encontrado.'
        }
    )
    def update(self, request, pk=None):
        try:
            personal = self.queryset.get(pk=pk)
        except models.TechnicalPerson.DoesNotExist:
            return JsonResponse({"error": "El personal técnico no fue encontrado"}, status=status.HTTP_404_NOT_FOUND)
        serializer = TechnicalPersonSerializer(personal, data=request.data, partial=True)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            success_message = "El personal técnico fue actualizado con éxito"
            return JsonResponse({"message": success_message, "data": serializer.data})
        except ValidationError as error:
            error_details = error.detail  
            errors = {key: str(value[0]) for key, value in error_details.items()} 
            return JsonResponse({"error": errors}, status=status.HTTP_400_BAD_REQUEST)
    @extend_schema(
    description="Eliminar un personal técnico.",
        responses={
            204: 'Mensaje de éxito al eliminar un personal técnico en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.',
            404: 'No encontrado - El personal técnico no fue encontrado.'
        }
    )
    def destroy(self, request, pk):
        try:
            technical_person = self.queryset.get(id=pk)
        except models.TechnicalPerson.DoesNotExist:
            return JsonResponse({"error": "El personal técnico no fue encontrado"}, status=status.HTTP_404_NOT_FOUND)
        user = technical_person.user
        user.delete()
        technical_person.delete()
        return JsonResponse({"message": "El personal técnico fue eliminado"}, status=status.HTTP_200_OK)
    
#--------------------------

class RequestViewSet(viewsets.ModelViewSet):
    queryset = models.Request.objects.all()
    serializer_class = RequestSerializer
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.action in ['create']:
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]

    def handle_exception(self, exc):
        response = exception_handler(exc, self.request)

        if response is None:
            return  Response({'error': str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if isinstance(exc, Http404):
            response.data = {'error': 'La solicitud no fue encontrada.'}
        return response

    @extend_schema(
        description="Obtiene una lista de elementos solicitud.",
        responses={            
            200: 'Lista de elementos solicitudes en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            404: 'No encontrado - La lista de elementos solicitudes no está disponible.'}
    )
    def list(self, request):

        requests = models.Request.objects.all()
        serializer = self.serializer_class(requests, many=True)
        
        return JsonResponse(serializer.data, safe=False)

    @extend_schema(
    description="Crear una nueva solicitud.",
        responses={
            201: 'Mensaje de éxito al guardar una solicitud en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
            400: 'Bad request - La petición es inválida.'
        }
    )
    def create(self, request):
        self.permission_classes = [IsAuthenticated]
        serializer = self.serializer_class(data=request.data)

        if not serializer.is_valid():
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
        email = request.data.get('academic', {}).get('user', {}).get('email')

        existing_user = models.User.objects.filter(email=email)
        if existing_user and existing_user.first().is_active:
            return JsonResponse({'message': 'Ya existe una cuenta con este email.'}, status=status.HTTP_400_BAD_REQUEST)

        # _ = serializer.save()
        headers = self.get_success_headers(serializer.data)
        message = "La solicitud fue guardada con éxito"

        technical_persons = models.TechnicalPerson.objects.all()
        technical_person_emails = [
            technical_person.user.email 
            for technical_person 
            in technical_persons
        ]
        orcid = request.data.get('orcid', '')
        about = request.data.get('about', '')

        resend.api_key = os.environ["RESEND_API_KEY"]

        params: resend.Emails.SendParams = {
            "from": f'Biocolección IIB-UV <{os.environ["RESEND_EMAIL"]}>',
            "to": technical_person_emails,
            "subject": "Solicitud de acceso a la biocolección",
            'text': f'ORCID: https://orcid.org/{orcid}\nEmail: {email}\n\nAcerca de: {about}',
        }

        resend.Emails.send(params)

        return JsonResponse({"message": message}, status=status.HTTP_201_CREATED, headers=headers)
        

    @extend_schema(
    description="Obtiene una lista de elementos solicitud cuyo estado es pendiente.",
        responses={
            200: 'Lista de elementos solicitud en formato JSON.',
            401: 'No autorizado - La autenticación ha fallado.',
        }
    )
    def get_pending(self, request):
        pending_requests = models.Request.objects.filter(status="pendiente").all()
        serializer = self.serializer_class(pending_requests, many=True)
        response = {
            "message": "",
            "data": serializer.data
        }
        return JsonResponse(response, safe=False, status=status.HTTP_200_OK)
    
    @extend_schema(
    description="Obtiene el número de elementos solicitud cuyo estado es pendiente.",
        responses={
            200: 'Número entero de elementos.',
            401: 'No autorizado - La autenticación ha fallado.',
        }
    )
    def get_pending_count(self, request):
        pending_request_count = models.Request.objects.filter(status="pendiente").count()
        response = {
            "message": "",
            "data": pending_request_count
        }
        return JsonResponse(response, safe=False, status=status.HTTP_200_OK)


    @extend_schema(
    description="Actualiza el estado de una solicitud a aprobada, y notifica al solicitante vía email.",
        responses={
            200: 'Número entero de elementos.',
            400: 'Bad request - La petición es inválida.',
            401: 'No autorizado - La autenticación ha fallado.',
        }
    )
    def approve(self, request, request_id):
        self.permission_classes = [IsAuthenticated]
        access_request = models.Request.objects.get(id=request_id)

        if access_request.status != 'pendiente':
            return JsonResponse({'message': f'La solicitud ya fue {access_request.status}.'}, safe=False, status=status.HTTP_400_BAD_REQUEST)

        access_request.status = 'aprobada'
        # access_request.save()
    
        user = models.User.objects.get(id=access_request.academic.user.id)
        user.is_active = 't'
        # user.save()
        
        resend.api_key = os.environ["RESEND_API_KEY"]

        params: resend.Emails.SendParams = {
            "from": os.environ["RESEND_EMAIL"],
            "to": ["maledict@protonmail.com"],
            "subject": "Test",
            'text': 'Test',
        }
        try:
            resend.Emails.send(params)
        except Exception as e: 
            return JsonResponse({"message": str(e)}, status=status.HTTP_200_OK)


        message = 'La solicitud fue concedida con éxito'
        return JsonResponse({"message": message}, status=status.HTTP_200_OK)

        

    @extend_schema(
    description="Actualiza el estado de una solicitud a rechazada, y notifica al solicitante vía email.",
        responses={
            200: 'Número entero de elementos.',
            400: 'Bad request - La petición es inválida.',
            401: 'No autorizado - La autenticación ha fallado.',
        }
    )
    def reject(self, request, request_id):
        self.permission_classes = [IsAuthenticated]
        access_request = models.Request.objects.get(id=request_id)

        if access_request.status != 'pendiente':
            return JsonResponse({'message': f'La solicitud ya fue {access_request.status}.'}, safe=False, status=status.HTTP_400_BAD_REQUEST)

        access_request.status = 'rechazada'
        access_request.save()

        user = models.User.objects.get(id=access_request.academic.user.id)

        resend.api_key = os.environ["RESEND_API_KEY"]

        params: resend.Emails.SendParams = {
            "from": f'Biocolección IIB-UV <{os.environ["RESEND_EMAIL"]}>',
            "to": [user.email],
            "subject": "Solicitud rechazada",
            'text': f'Lo sentimos, su solicitud fue rechazada.',
        }

        resend.Emails.send(params)

        message = 'La solicitud fue rechazada con éxito'
        return JsonResponse({"message": message}, status=status.HTTP_200_OK)
        