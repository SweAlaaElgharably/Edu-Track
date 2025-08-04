# faculty/urls.py
from django.urls import path
from . import views

app_name = 'faculty'

urlpatterns = [
    # List all faculties
    path('', views.FacultyListAPIView.as_view(), name='faculty-list'),
    # Create new faculty
    path('create/', views.FacultyCreateAPIView.as_view(), name='faculty-create'),
    # Detail, Update, Delete
    path('<slug:slug>/', views.FacultyDetailAPIView.as_view(), name='faculty-detail'),
]