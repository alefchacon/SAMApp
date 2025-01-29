from django.contrib import admin
from rest_framework import routers
from django.urls import path, include 
from . import views



router = routers.DefaultRouter()
router.register(r'species', views.SpecieViewSet, basename="Specie")
router.register(r'specimens', views.SpecimenViewSet, basename="Specimen")
router.register(r'contributors', views.ContributorViewSet, basename="Contributor")
router.register(r'locations', views.LocationViewSet, basename="Location")
router.register(r'contributors-role', views.ContributorRoleViewSet, basename="Contributor-Role")
router.register(r'contributors-specimen', views.ContributorSpecimenViewSet, basename="Contributor-Specimen")


urlpatterns = [
    path('', include(router.urls)),
    path('species/<int:id_specie>/specimen-list-visitor/', views.SpecieViewSet.as_view({'get': 'get_specimen_list_visitor'}), name='specimen-list-visitor'),
    path('species/<int:id_specie>/specimen-list-academic/', views.SpecieViewSet.as_view({'get': 'get_specimen_list_academic'}), name='specimen-list-academic'),
    path('species/<int:id_specie>/specimens/', views.SpecieViewSet.as_view({'get': 'specimen_list'}), name='specimen-list'),
    path('locations/specimen/<int:specimen>/', views.LocationViewSet.as_view({'get': 'get_specimen'}), name='get_specimen'),
    path('species/family/<str:family>/', views.SpecieViewSet.as_view({'get': 'get_by_family'}), name='get_by_family'),
    path('species/orden/<str:orden>/', views.SpecieViewSet.as_view({'get': 'get_by_orden'}), name='get_by_orden'),
    path('species/gender/<str:gender>/', views.SpecieViewSet.as_view({'get': 'get_by_gender'}), name='get_by_gender'),
    path('species/scientific_name/<str:scientific_name>/', views.SpecieViewSet.as_view({'get': 'get_by_scientific_name'}), name='get_by_scientific_name'),
    path('contributors-specimen/specimen/<int:specimen_id>/', views.ContributorSpecimenViewSet.as_view({'get': 'get_specimen_id'}), name='get_specimen_id'),


    path('species/migrate', views.SpecieViewSet.as_view({
      'get': 'get_migration_format',
      'post': 'migrate_collection'
    }), name='species-migrate'),
    path('taxonomy-ranks/', views.SpecieViewSet.as_view({'get': 'get_taxonomy_ranks'}), name='taxonomy-ranks'),

]