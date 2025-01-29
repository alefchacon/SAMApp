from rest_framework import serializers
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from principal import regexs
from species.models import Contributor, ContributorRole, ContributorSpecimen, Location, Specimen, Specie
from django.utils import timezone


class SpecieSerializer(serializers.ModelSerializer):
    class Meta:
       model = Specie
       fields = ['id', 'class_specie',
       'orden', 'family', 'gender', 'specie_specie','subspecie']
       partial = True
   
    class_specie = serializers.CharField(max_length=70,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='La clase solo puede contener letras y espacios.',
    )])
    orden = serializers.CharField(max_length=70,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='El orden solo puede contener letras y espacios.',
    )])
    family = serializers.CharField(max_length=70,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='La familia solo puede contener letras y espacios.',
    )])
    gender = serializers.CharField(max_length=70,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='El género solo puede contener letras y espacios.',
        )])
    subspecie = serializers.CharField(max_length=70,
    allow_blank=True,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='La subespecie solo puede contener letras y espacios.',
    )])
    specie_specie = serializers.CharField(max_length=100,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='El nombre científico solo puede contener letras y espacios.',
    )])

class ContributorSerializer(serializers.ModelSerializer):
    class Meta:
        model= Contributor
        fields= ['id','name', 'code']
        partial = True
    name = serializers.CharField(max_length=200, allow_null=True, allow_blank=True, required=False, validators=[RegexValidator(
        regex= regexs.only_names,
        message='El nombre  solo puede contener letras, espacios y puntos.',
    )])
    code = serializers.CharField(max_length=100, 
    validators=[RegexValidator(
        regex= regexs.colector_code,
        message='El código solo puede contener letras, espacios y puntos.',
    )])


class ContributorSpecimenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContributorSpecimen
        fields=['id', 'specimen', 'contributor', 'contributor_role']
        partial = True
    
    

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id','coordinates_cartesian_plane_x','coordinates_cartesian_plane_y',
        'geographical_coordinates_x','geographical_coordinates_y',
        'utm_region','msnm_google',
        'altitude','institute_code','institute', 'kilometer','specific_location',
        'municipality','state','country','specimen',]
        partial = True
    coordinates_cartesian_plane_x = serializers.FloatField()
    coordinates_cartesian_plane_y = serializers.FloatField()
    geographical_coordinates_x = serializers.FloatField(required=False, allow_null=True)
    geographical_coordinates_y = serializers.FloatField(required=False, allow_null=True)
    utm_region = serializers.CharField(max_length=4)
    msnm_google = serializers.IntegerField()
    altitude = serializers.IntegerField(required=False, allow_null=True)
    institute_code = serializers.CharField(max_length=100,validators=[RegexValidator(
        regex=regexs.catalog_id_specimen,
        message='La id del instituto solo puede contener letras y guiones.',
    )])
    institute = serializers.CharField(max_length=150, 
     validators=[RegexValidator(
        regex= regexs.only_words_with_commas,
        message='El instituto solo puede contener letras y espacios.',
    )])
    kilometer = serializers.CharField(max_length=100, required=False, allow_null=True, allow_blank=True)
    specific_location = serializers.CharField(max_length=100, 
    allow_null=True, allow_blank=True, 
    validators=[RegexValidator(
        regex= regexs.only_words_with_commas,
        message='La localidad específica solo puede contener letras y espacios',
    )], required=False)
    municipality = serializers.CharField(max_length=100, allow_null=True, allow_blank=True
    ,validators=[RegexValidator(
        regex= regexs.only_words,
        message='El municipio solo puede contener letras y espacios.',
    )], required=False)
    state = serializers.CharField(max_length=100,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='El estado solo puede contener letras y espacios.',
    )])
    country = serializers.CharField(max_length=100,
    validators=[RegexValidator(
        regex= regexs.only_words,
        message='El país solo puede contener letras y espacios.',
    )])
    specimen = serializers.PrimaryKeyRelatedField(queryset=Specimen.objects.all(), allow_null=True)

class SpecimenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specimen
        fields = [ 'id','catalog_id', 'status', 
        'length_total', 'length_ear','length_paw', 'length_tail', 
        'sex', 'reproductive_status','weight', 'nature', 'number_embryos',
        'colection_code', 'colection_date', 'colection_number','hour', 'comment',
        'specie', 'preparation_date', 'class_age',
        'colector', 'preparator', 'location'
        ]
        partial = True
    catalog_id = serializers.CharField(max_length=20, 
    validators=[RegexValidator(
        regex=regexs.catalog_id_specimen,
        message='La id del catálogo solo puede contener letras y guiones.',
    )])
    status = serializers.BooleanField()
    length_total = serializers.DecimalField(max_digits=5, decimal_places=3, validators=[MinValueValidator(0.000)], required=False, allow_null=True)
    length_ear = serializers.DecimalField(max_digits=5, decimal_places=3, validators=[MinValueValidator(0.000)], required=False, allow_null=True)
    length_paw = serializers.DecimalField(max_digits=5, decimal_places=3, validators=[MinValueValidator(0.000)],required=False,allow_null=True)
    length_tail = serializers.DecimalField(max_digits=5, decimal_places=3, validators=[MinValueValidator(0.000)],required=False,allow_null=True)
    class_age = serializers.CharField(max_length=50, required=False)
    sex = serializers.CharField(max_length=5)
    reproductive_status = serializers.CharField(max_length=50, required=False)
    weight = serializers.DecimalField(max_digits=5, decimal_places=3, validators=[MinValueValidator(0.000)], required=False,allow_null=True)
    nature = serializers.CharField(max_length=50, allow_blank=False, required=True, allow_null=False)
    number_embryos = serializers.IntegerField(validators=[MinValueValidator(0)], required=False,allow_null=True)
    colection_code = serializers.CharField(max_length=20, validators=[RegexValidator(
        regex=regexs.catalog_id_specimen,
        message='La id de la colección solo puede contener letras y guiones.',
    )])
    colection_date = serializers.DateField(validators=[MaxValueValidator(timezone.now().date())])
    colection_number = serializers.IntegerField(validators=[MinValueValidator(0)], required=True,allow_null=False)
    preparation_date = serializers.DateField(validators=[MaxValueValidator(timezone.now().date())], required=False, allow_null=True)
    hour = serializers.CharField(max_length=5, validators=[RegexValidator(
        regex=regexs.hour_regex,
        message='La hora es inválida.',
    )], required=False, allow_null=True, allow_blank=True)
    comment = serializers.CharField(max_length=200, allow_blank=True, required=False, allow_null=True)
    specie = serializers.PrimaryKeyRelatedField(queryset=Specie.objects.all(), required=False, allow_null=True)
    colector = serializers.SerializerMethodField()
    preparator = serializers.SerializerMethodField()
    location = serializers.SerializerMethodField()

    def get_colector(self, obj):
        contributor_specimen = obj.contributorspecimen_set.filter(contributor_role=1).first()
        if contributor_specimen:
            return {
                'id': contributor_specimen.id,
                'contributor_id': contributor_specimen.contributor.id,
                'contributor_role_id': contributor_specimen.contributor_role_id,
                'name': contributor_specimen.contributor.name,
                'code': contributor_specimen.contributor.code,
            }
        return None
    
    def get_preparator(self, obj):
        contributor_specimen = obj.contributorspecimen_set.filter(contributor_role=2).first()
        if contributor_specimen:
            return {
                'id': contributor_specimen.id,
                'contributor_id': contributor_specimen.contributor.id,
                'contributor_role_id': contributor_specimen.contributor_role_id,
                'name': contributor_specimen.contributor.name,
                'code': contributor_specimen.contributor.code,
            }
        return None
    
    def get_location(self, obj):
        location = obj.specimen.first()
        if location:
            return LocationSerializer(location).data
        return None

       

class ContributorRoleSerializer(serializers.ModelSerializer):
    role= serializers.CharField(max_length=30)
    class Meta:
        model= ContributorRole
        fields= ['id','role']


    
