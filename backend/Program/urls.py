from django.urls import path
from .views import (
    ProgramListView,
    ProgramCreateView,
    ProgramRetrieveView,
    ProgramUpdateView,
    ProgramDeleteView
)

urlpatterns = [
    path('', ProgramListView.as_view(), name='program-list'),
    path('create/', ProgramCreateView.as_view(), name='program-create'),
    path('<int:pk>/', ProgramRetrieveView.as_view(), name='program-detail'),
    path('<int:pk>/update/', ProgramUpdateView.as_view(), name='program-update'), # Handles PUT and PATCH
    path('<int:pk>/delete/', ProgramDeleteView.as_view(), name='program-delete'),
]
