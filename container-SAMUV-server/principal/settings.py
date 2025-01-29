
import os
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv

dotenv_path = os.path.join(os.getcwd(), 'settings.env')
load_dotenv(dotenv_path)
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('SECRET_KEY')
#'django-insecure-u(c2muqgh(l-ad-m8435+&^q-$f9otnzqt3u_edg$zd9&3v2vq'
# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ['*',  'localhost', '127.0.0.1']
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MIGRATION_FORMAT_FILENAME = "SAM_MIGRACION.csv"
FORMATS_URL = 'formats'
# Application definition
#SAMastozoologicaServer\apps.py
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'SAMastozoologicaServer.apps.SamastozoologicaserverConfig',
    'user.apps.UserConfig',
    'species.apps.SpeciesConfig',
    'photosheets.apps.PhotosheetsConfig',
    'rest_framework_simplejwt',  
    'corsheaders',
    'coreapi',
    'drf_spectacular',
]
SPECTACULAR_SETTINGS = {
    'TITLE': 'Sistema de Administración de la colección de mamíferos',
    'DESCRIPTION': '',
    'VERSION': '1.0.0',
}
EXPIRING_TOKEN_DURATION = timedelta(hours=1)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',  
    ],
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
}
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=40),
    #'ACCESS_TOKEN_LIFETIME': timedelta(seconds=10),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
}
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
]

ROOT_URLCONF = 'principal.urls'
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'principal.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get("DATABASE_NAME"),
        'USER': os.environ.get("DATABASE_USER"),
        'PASSWORD': os.environ.get("DATABASE_PASSWORD"),
        'HOST': os.environ.get("DATABASE_HOST"), 
        'PORT': os.environ.get("DATABASE_PORT"),
    }
}
# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
# Internationalization
LANGUAGE_CODE = 'es-mx'  
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [BASE_DIR / "static"]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.Argon2PasswordHasher',
]

APP_URL = os.environ.get("APP_URL", "http://localhost:8000")

CORS_ALLOWED_ORIGINS = [
    APP_URL
]

EMAIL_BACKEND = os.environ.get("EMAIL_BACKEND", 'django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = os.environ.get("EMAIL_HOST", 'smtp.gmail.com')
EMAIL_PORT = os.environ.get("EMAIL_PORT", 587)
EMAIL_USE_TLS = os.environ.get("EMAIL_USE_TLS", True)
EMAIL_HOST_USER = os.environ.get("EMAIL_HOST_USER", 'biocoleccionuv@gmail.com')
EMAIL_HOST_PASSWORD = os.environ.get("EMAIL_HOST_PASSWORD", 'fsik ceao xswm aoau')
DEFAULT_FROM_EMAIL = os.environ.get("DEFAULT_FROM_EMAIL", 'biocoleccionuv@gmail.com')

PATH_PREFIX = os.environ.get("PATH_PREFIX", "")
if PATH_PREFIX and not PATH_PREFIX.endswith('/'):
    PATH_PREFIX += '/'