from django.urls import path
from .views import *

urlpatterns = [
    path('', ListUser.as_view(), name='User-list'),
    path('create/', CreateUser.as_view(), name='User-create'),
    path('<int:pk>/', RetrieveUser.as_view(), name='User-retrieve'),
    path('<int:pk>/update/', UpdateUser.as_view(), name='User-update'),
    path('<int:pk>/delete/', DestroyUser.as_view(), name='User-destroy'),
]
