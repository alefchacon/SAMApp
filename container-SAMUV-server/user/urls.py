from django.contrib import admin
from rest_framework import routers
from django.urls import path, include 
from . import views



router = routers.DefaultRouter()
router.register(r'academics', views.AcademicViewSet, basename="Academic")
router.register(r'technical-persons', views.TechnicalPersonViewSet, basename="TechnicalPerson")
router.register(r'requests', views.RequestViewSet, basename="Request")


urlpatterns = [
    path('', include(router.urls)),

    path('requests/approve/<int:request_id>', views.RequestViewSet.as_view({'get': 'approve'}), name='approve'),
    path('requests/reject/<int:request_id>', views.RequestViewSet.as_view({'get': 'reject'}), name='reject'),
    path('requests/pending-count', views.RequestViewSet.as_view({'get': 'get_pending_count'}), name='get-count'),
    path('requests/pending', views.RequestViewSet.as_view({'get': 'get_pending'}), name='get-pending'),

]