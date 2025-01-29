from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.exceptions import ObjectDoesNotExist
from django.core.exceptions import ValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'is_active']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=validated_data['is_active']
        )
        user.save()
        return user

class LoginSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['profile'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email
        }

        fullname = "N/A"
        role = "VISITOR"

        if hasattr(self.user, 'academic'):
            academic = self.user.academic 
            fullname = f'{academic.names} {academic.father_last_name} {academic.mother_last_name}'
            role = "ACADEMIC"

        if hasattr(self.user, 'technical_person'):
            technical_person = self.user.technical_person 
            fullname = technical_person.fullname
            role = "TECHNICAL_PERSON"
            

        data['profile']['fullname'] = fullname
        data['profile']['role'] = role

        return data
