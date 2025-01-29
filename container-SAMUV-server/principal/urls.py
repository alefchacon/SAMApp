
from django.urls import path, include 
from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from principal import settings

router = routers.DefaultRouter()
urlpatterns = [
    path('', include(router.urls)),
    path('%sschema/' % settings.PATH_PREFIX, SpectacularAPIView.as_view(), name='schema'),
    path('%sdocs/'   % settings.PATH_PREFIX, SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('%sredoc/'  % settings.PATH_PREFIX, SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('%sapi/'    % settings.PATH_PREFIX, include('SAMastozoologicaServer.urls')),
    path('%sapi/'    % settings.PATH_PREFIX, include('species.urls')),
    path('%sapi/'    % settings.PATH_PREFIX, include('user.urls')),
    path('%sapi/'    % settings.PATH_PREFIX, include('photosheets.urls')),
    path('%sdocs/'   % settings.PATH_PREFIX, include_docs_urls(title="SAMS API"))
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)