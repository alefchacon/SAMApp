from django.db import models


# Tu código aquí


# Create your models here.
class PhotoSheet(models.Model):
    id = models.AutoField(primary_key=True)
    description= models.CharField(null=True, max_length=100)
    sheet = models.ImageField(upload_to='photosheets/')
