from django.urls import path
from .views import *

urlpatterns = [
    path('', ListProgram.as_view(), name='Program-list'),
    path('create/', CreateProgram.as_view(), name='Program-create'),
    path('<slug:slug>/', RetrieveProgram.as_view(), name='Program-retrieve'),
    path('<slug:slug>/update/', UpdateProgram.as_view(), name='Program-update'),
    path('<slug:slug>/delete/', DestoryProgram.as_view(), name='Program-destroy'),
]