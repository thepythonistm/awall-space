import os
from pathlib import Path
from datetime import timedelta
from decouple import config
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('DJANGO_SECRET_KEY')
DEBUG = False

ALLOWED_HOSTS = [
    "awall-space.onrender.com",
    "awall-story-space.vercel.app",
    "localhost",
    "127.0.0.1",
]

DATA_UPLOAD_MAX_MEMORY_SIZE = 1048576000
FILE_UPLOAD_MAX_MEMORY_SIZE = 1048576000

DATABASES = {
    'default': dj_database_url.parse(
        config('DATABASE_URL', default='postgresql://awalluser:dbM118@localhost:5432/awalldb'),
        conn_max_age=600
    )
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=int(config('ACCESS_TOKEN_LIFETIME', default='60'))),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=int(config('REFRESH_TOKEN_LIFETIME', default='1'))),
    'AUTH_HEADER_TYPES': ('Bearer',),
    'BLACKLIST_AFTER_ROTATION': True,
}

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    'corsheaders',
    'csp',

    'awalluser',
    'createpost',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',  
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'csp.middleware.CSPMiddleware',
]

CORS_ALLOWED_ORIGINS = [
    "https://awall-story-space.vercel.app",
    "http://localhost:3000",
]
CORS_ALLOWED_ORIGINS = [
    "https://awall-story-space.vercel.app",
]

CSRF_TRUSTED_ORIGINS = [
    "https://awall-story-space.vercel.app",
    "https://awall-space.onrender.com",  
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ),
}

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

ROOT_URLCONF = 'awallbackend.urls'
WSGI_APPLICATION = 'awallbackend.wsgi.application'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CONTENT_SECURITY_POLICY = {
    "DIRECTIVES": {
        "default-src": ("'self'",),
        "style-src": ("'self'", "'unsafe-inline'"),
        "script-src": ("'self'", "'unsafe-inline'"),
        "img-src": ("'self'", "data:"),
        "connect-src": (
            "'self'",
            "https://awall-story-space.vercel.app",
            "https://awall-space.onrender.com",
        ),
    }
}
