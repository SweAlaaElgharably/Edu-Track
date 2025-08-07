from django.urls import path
from .views import *

urlpatterns = [
    path('', ListUniversity.as_view(), name='university-list'),
    path('create/', CreateUniversity.as_view(), name='university-create'),
    path('<slug:slug>/', RetrieveUniversity.as_view(), name='university-retrieve'),
    path('<slug:slug>/update/', UpdateUniversity.as_view(), name='university-update'),
    path('<slug:slug>/delete/', DestoryUniversity.as_view(), name='university-destroy'),
]