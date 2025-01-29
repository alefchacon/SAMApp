from rest_framework import serializers
from . import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from principal import regexs
from user.models import Academic
from SAMastozoologicaServer.serializers import UserSerializer
import re 
from django.contrib.auth.models import UserManager


class AcademicSerializer(serializers.ModelSerializer):
    names = serializers.CharField(max_length=100,
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='El nombre  solo puede contener letras y espacios.',
        )])
    father_last_name= serializers.CharField(max_length=50, 
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='El apellido paterno solo puede contener letras y espacios.',
        )])
    mother_last_name = serializers.CharField(max_length=50,
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='El apellido materno solo puede contener letras y espacios.',
        )])
    state = serializers.CharField(max_length=50, 
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='El estado solo puede contener letras y espacios.',
        )])
    major= serializers.CharField(max_length=200, 
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='El grado académico solo puede contener letras y espacios.',
        )])
    city= serializers.CharField(max_length=50, 
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='La ciudad solo puede contener letras y espacios.',
        )])
    college = serializers.CharField(max_length=100, 
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='La universidad solo puede contener letras y espacios.',
        )])
    position = serializers.CharField(max_length=50, 
        validators=[RegexValidator(
            regex= regexs.alnum_with_spaces,
            message='El posición solo puede contener letras y espacios.',
        )])
    degree = serializers.CharField(max_length=50, 
        validators=[RegexValidator(
            regex= regexs.only_words,
            message='La licenciatura solo puede contener letras y espacios.',
        )])
    #user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), allow_null=True, required=False)
    user = UserSerializer()
    
    class Meta:
       model = models.Academic
       fields = ['id','names', 'father_last_name', 'mother_last_name', 'state',
                  'major', 'city', 'college', 'position', 'degree',
                  'user']
       partial=True

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        user_data["first_name"] = validated_data["names"]
        user_data["last_name"] = validated_data["father_last_name"]
        user_data["is_active"] = "f";
        if (user_serializer.is_valid()):
            user_instance = user_serializer.save()
            academic = models.Academic.objects.create(user=user_instance, **validated_data)
            return academic

class TechnicalPersonSerializer(serializers.ModelSerializer):
   fullname= serializers.CharField(max_length=100,default="")
   position= serializers.CharField(max_length=50,default="")
   nomination = serializers.CharField(max_length=50, default="")
   user = UserSerializer()

   class Meta:
       model = models.TechnicalPerson
       fields = ['id','fullname', 'position', 'nomination','user']
       partial=True
       
   def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_data["is_active"] = "t";
        user_serializer = UserSerializer(data=user_data)
        
        if (not user_serializer.is_valid()):
            return
        
        user_instance = user_serializer.save()

        technical_person = models.TechnicalPerson.objects.create(
            fullname = f'{user_data["first_name"]} {user_data["last_name"]}',
            position = validated_data["position"],
            nomination = validated_data["position"],
            user=user_instance,
        )
        return technical_person

class RequestSerializer(serializers.ModelSerializer):
   
    orcid = serializers.CharField(max_length=19,
    validators=[RegexValidator(
        regex= regexs.orcid,
        message='El ORCID debe seguir el siguiente formato: 1234-1234-1234-1234.',
    )])
    about = serializers.CharField(max_length=500)
    academic = AcademicSerializer()
        
    class Meta:
       model = models.Request
       fields = ['id','orcid', 'about', 'status', 'username', 'email', 'academic', 'password']

    def create(self, validated_data):
        academic_data = validated_data.pop('academic')
        academic_serializer = AcademicSerializer(data=academic_data)

        if (academic_serializer.is_valid()):
            academic_instance = academic_serializer.save()
            user_request = models.Request.objects.create(academic=academic_instance, **validated_data)
            return user_request
