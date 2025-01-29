from django.forms import ValidationError
from rest_framework import serializers
from . import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from principal import regexs
from PIL import Image


class PhotoSheetSerializer(serializers.ModelSerializer):
    description = serializers.CharField(
        max_length=100,
        validators=[RegexValidator(
            regex=regexs.only_words,
            message='La descripción solo puede contener letras y espacios.',
        )], required=False
    )
   
    def create(self, validated_data):
     try:
        image_file = validated_data.pop('sheet')
        photosheet = models.PhotoSheet.objects.create(**validated_data)
        photosheet.sheet.save(image_file.name, image_file, save=True)
        return photosheet
     except Exception as e:
        raise ValidationError(f"Error creando la ficha fotográfica: {e}")
    
    class Meta:
        model = models.PhotoSheet
        fields = ['id','description', 'sheet']
        partial = True


