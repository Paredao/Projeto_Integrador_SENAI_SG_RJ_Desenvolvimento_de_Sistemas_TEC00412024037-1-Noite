from rest_framework import routers
from .views import ProdutoViewSet

router = routers.DefaultRouter()
router.register(r'produtos', ProdutoViewSet, basename='produto')

urlpatterns = router.urls

from django.urls import path
from .views import CustomAuthToken, logout_user

urlpatterns += [
    path('login/', CustomAuthToken.as_view(), name='api_login'),
    path('logout/', logout_user, name='api_logout'),
]

