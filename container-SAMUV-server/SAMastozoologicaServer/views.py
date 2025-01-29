from .serializers import UserSerializer, LoginSerializer
from user.serializers import TechnicalPersonSerializer
from user.models import TechnicalPerson
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.utils import extend_schema
from user.models import Request
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView


class SignUpViewSet(generics.CreateAPIView):
    """
    This view add new users to the system.
    """
    serializer_class = UserSerializer

    @extend_schema(
        description="Crear un nuevo usuario en el sistema",
        responses={
            200: 'Datos del usuario en formato JSON.',
            400: 'Error al registrar usuario'
        }
    )
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        if response.status_code == status.HTTP_201_CREATED:
            custom_data = {
                'message': 'Usuario registrado exitosamente',
                'user_data': response.data
            }
            return Response(custom_data, status=response.status_code)  
        return Response({'message': 'Error al registrar usuario'}, status=response.status_code)

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        return Response(data)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Cerrar la sesión de un usuario en el sistema",
        responses={
            200: 'Mensaje que la sesión ha sido finalizada con éxito.',
            400: 'Error al cerrar sesión'
        }
    )
    def post(self, request):
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            try:
                return Response(
                    {'message': 'Se ha cerrado la sesión correctamente.'},
                    status=status.HTTP_200_OK,
                )
            except Exception as exception:
                return Response(
                    {'message': f'Error al invalidar el token de actualización.{str(exception)} '},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {'message': 'No se proporcionó un token de actualización.'},
                status=status.HTTP_400_BAD_REQUEST,
            )


class PasswordUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @extend_schema(
        description="Actualizar la contraseña de un usuario en el sistema",
        responses={
            200: 'Mensaje de que la contraseña ha sido actualizada con éxito.',
            400: 'Error al actualizar la contraseña'
        }
    )
    def post(self, request):
        data = request.data
        try:
            old_password = data['old_password']
            password = data['password']
        except KeyError as exc:
            raise ValidationError({'detail': 'Se deben proporcionar las contraseñas antiguas y nuevas.'}) from exc

        user = request.user

        if not user.check_password(old_password):
            raise ValidationError({'detail': 'La contraseña antigua no es válida.'})

        user.set_password(password)
        user.save()

        response_data = {'message': "La contraseña fue actualizada con éxito"}
        return JsonResponse(response_data)


