from rest_framework import routers
from django.urls import path 
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenVerifyView
)

router = routers.DefaultRouter()

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
    path('signup/', views.SignUpViewSet.as_view(), name='register'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('password-reset/', views.PasswordUpdateView.as_view(), name='password-reset'),
]

