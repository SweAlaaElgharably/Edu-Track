from django.urls import path
from .views import *

urlpatterns = [
    path('', ListCourse.as_view(), name='Course-list'),
    path('create/', CreateCourse.as_view(), name='Course-create'),
    path('<slug:slug>/', RetrieveCourse.as_view(), name='Course-retrieve'),
    path('<slug:slug>/update/', UpdateCourse.as_view(), name='Course-update'),
    path('<slug:slug>/delete/', DestoryCourse.as_view(), name='Course-destroy'),
]