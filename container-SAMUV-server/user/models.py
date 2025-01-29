from django.db import models
from re import T
from django.core.validators import RegexValidator
from django.contrib.auth.models import User
import uuid

""""
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_logged_in = models.BooleanField(default=False)

"""

class Academic(models.Model):
    id = models.AutoField(primary_key=True)
    names = models.CharField(max_length=100, default="")
    father_last_name= models.CharField(max_length=50, default="")
    mother_last_name = models.CharField(max_length=50, default="")
    state = models.CharField(max_length=50, default="")
    major= models.CharField(max_length=200, default="")
    city= models.CharField(max_length=50, default="")
    college = models.CharField(max_length=100, default="")
    position = models.CharField(max_length=50, default="")
    degree = models.CharField(max_length=50, default="")
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name="academic")


class TechnicalPerson(models.Model):
    id = models.AutoField(primary_key=True)
    fullname= models.CharField(max_length=100,default="")
    position= models.CharField(max_length=50,default="")
    nomination = models.CharField(max_length=50, default="")
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, related_name="technical_person")

class Request(models.Model):
    id = models.AutoField(primary_key=True) 
    orcid = models.CharField(max_length=19, default="")
    about = models.CharField(max_length=500, default="")
    status = models.CharField(max_length=20, choices=[
        ('pendiente', 'pendiente'),
        ('aprobada', 'Aprobada'),
        ('rechazada', 'Rechazada'),
        ('utilizada', 'Utilizada')
    ], default='pendiente')
    username = models.CharField(default="")
    password = models.CharField(default="")
    email = models.EmailField(default="")
    academic = models.ForeignKey(Academic, on_delete=models.CASCADE, null=True)
    


# Usuario
# #

