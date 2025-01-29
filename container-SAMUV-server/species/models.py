from django.db import models
from django.core.exceptions import ValidationError


class Specie(models.Model):
    id = models.AutoField(primary_key=True) 
    class_specie = models.CharField(max_length=70, default="")
    orden = models.CharField(max_length=70, default="")
    family = models.CharField(max_length=70, default="")
    gender = models.CharField(max_length=70, default="")
    specie_specie = models.CharField(max_length=70, default="")
    subspecie = models.CharField(max_length=70, default="", blank=True)


class Specimen(models.Model):
    id = models.AutoField(primary_key=True)
    catalog_id = models.CharField(max_length=20)
    status = models.BooleanField(default=True)
    length_total = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    length_ear = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    length_paw = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    length_tail = models.DecimalField(max_digits=5, decimal_places=3, null=True, blank=True)
    class_age = models.CharField(max_length=50, blank=True)
    sex = models.CharField(max_length=5)
    reproductive_status = models.CharField(max_length=50, default="", blank=True,null=True)
    weight = models.DecimalField(max_digits=5, decimal_places=3,null=True, blank=True)
    nature = models.CharField(max_length=50, default="")
    number_embryos = models.IntegerField(null=True,  blank=True)
    colection_code = models.CharField(max_length=20)
    colection_date = models.DateField()
    colection_number = models.IntegerField(default=0)
    preparation_date= models.DateField(null=True, blank=True)
    hour = models.CharField(max_length=5,  blank=True, null=True)
    comment = models.CharField(max_length=200,  blank=True, null=True)
    specie = models.ForeignKey(Specie, on_delete=models.CASCADE, related_name='specimens', null=True)
    contributors = models.ManyToManyField('Contributor',  blank=True, through='ContributorSpecimen')


class Location(models.Model):
    id = models.AutoField(primary_key=True)
    #utm_x and utm_y
    coordinates_cartesian_plane_x = models.FloatField()
    coordinates_cartesian_plane_y = models.FloatField()    
    #lattitude and longitude
    geographical_coordinates_x = models.FloatField()
    geographical_coordinates_y = models.FloatField()   
    utm_region= models.CharField(max_length=4)
    msnm_google=models.IntegerField()
    altitude= models.IntegerField()
    institute_code=  models.CharField(max_length=100)
    institute=  models.CharField(max_length=150)
    kilometer=models.CharField(max_length=100, null=True, blank=True)
    specific_location=models.CharField(max_length=100, null=True, blank=True)
    municipality=models.CharField(max_length=100, null=True, blank=True)
    state=models.CharField(max_length=100)
    country=models.CharField(max_length=100)
    specimen= models.ForeignKey(Specimen, on_delete=models.CASCADE, related_name='specimen',null=True, blank=True)



class ContributorRole(models.Model):
    id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=30, verbose_name="role")


class Contributor(models.Model): 
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200, null=True)
    code = models.CharField(max_length=100, default="", unique=True)

class ContributorSpecimen(models.Model):
    id = models.AutoField(primary_key=True)
    specimen = models.ForeignKey(Specimen, on_delete=models.CASCADE)
    contributor = models.ForeignKey(Contributor, on_delete=models.CASCADE)
    contributor_role= models.ForeignKey(ContributorRole, on_delete=models.CASCADE)
