from django.urls import path
from .views import *

urlpatterns = [
    path('', ListLocation.as_view(), name='Location-list'),
    path('create/', CreateLocation.as_view(), name='Location-create'),
    path('<slug:slug>/', RetrieveLocation.as_view(), name='Location-retrieve'),
    path('<slug:slug>/update/', UpdateLocation.as_view(), name='Location-update'),
    path('<slug:slug>/delete/', DestoryLocation.as_view(), name='Location-destroy'),
]