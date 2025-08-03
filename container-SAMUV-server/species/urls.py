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
    path('species/order/<str:orden>/', views.SpecieViewSet.as_view({'get': 'get_by_orden'}), name='get_by_orden'),
    path('species/genus/<str:gender>/', views.SpecieViewSet.as_view({'get': 'get_by_gender'}), name='get_by_gender'),
    path('species/scientific_name/<str:scientific_name>/', views.SpecieViewSet.as_view({'get': 'get_by_scientific_name'}), name='get_by_scientific_name'),
    path('species/subspecie/<str:subspecie>/', views.SpecieViewSet.as_view({'get': 'get_by_subspecie'}), name='get_by_subspecie'),
    path('contributors-specimen/specimen/<int:specimen_id>/', views.ContributorSpecimenViewSet.as_view({'get': 'get_specimen_id'}), name='get_specimen_id'),
    path('species/orders', views.SpecieViewSet.as_view({'get': 'get_ordens'}), name='ordens'),
    path('species/<int:pk>', views.SpecieViewSet.as_view({'get': 'get'}), name='get'),


    path('species/search', views.SpecieViewSet.as_view({'get': 'search_species'}), name='species-by-taxon'),
    path('species/metrics', views.SpecieViewSet.as_view({'get': 'get_specimen_metrics_by_taxon'}), name='metrics-by-taxon'),
    path('species/migrate', views.SpecieViewSet.as_view({
      'get': 'get_migration_format',
      'post': 'migrate_collection'
    }), name='species-migrate'),
    path('ranks-preview', views.SpecieViewSet.as_view({'get': 'get_ranks_preview'}), name='ranks-preview'),
    path('species/taxon/<str:taxon>', views.SpecieViewSet.as_view({'get': 'get_taxon_by_name'}), name='taxon'),
    path('genders-by-family/<str:family>', views.SpecieViewSet.as_view({'get': 'get_genders_by_family'}), name='genders'),

]