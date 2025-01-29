from django.contrib import admin
from rest_framework import routers
from django.urls import path, include 
from . import views
from principal import settings


router = routers.DefaultRouter()
router.register('photosheets', views.PhotoSheetViewSet, basename="PhotoSheet")


urlpatterns = [
    path("", include(router.urls)),
]

