from django.urls import path
from .views import RegisterView, get_csrf_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import ProfileView, LogoutView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('csrf/', get_csrf_token, name='get_csrf_token'),
    path('profile/', ProfileView.as_view(), name='user-profile'),
    path('logout/', LogoutView.as_view(), name='logout'),

]
