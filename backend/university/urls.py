from django.urls import path
from . import views

urlpatterns = [
    
    path('', views.UniversityGetAPIView.as_view(), name='university-list'),
    path('create/', views.UniversityCreateAPIView.as_view(), name='university-create'),
   #Get by slug , Update ,Delete
    path('<slug:slug>/', views.UniversityRetrieveAPIView.as_view(), name='university-detail'),
    path('<slug:slug>/update/', views.UniversityUpdateAPIView.as_view(), name='university-update'),
    path('<slug:slug>/delete/', views.UniversityDeleteAPIView.as_view(), name='university-delete'),
]