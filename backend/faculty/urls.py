from django.urls import path
from .views import *

urlpatterns = [
    path('', ListFaculty.as_view(), name='Faculty-list'),
    path('create/', CreateFaculty.as_view(), name='Faculty-create'),
    path('<slug:slug>/', RetrieveFaculty.as_view(), name='Faculty-retrieve'),
    path('<slug:slug>/update/', UpdateFaculty.as_view(), name='Faculty-update'),
        path('<slug:slug>/delete/', DestroyFaculty.as_view(), name='Faculty-destroy'),
]