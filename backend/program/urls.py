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
    path('<slug:slug>/', ProgramRetrieveView.as_view(), name='program-detail'),
    path('<slug:slug>/update/', ProgramUpdateView.as_view(), name='program-update'), # Handles PUT and PATCH
    path('<slug:slug>/delete/', ProgramDeleteView.as_view(), name='program-delete'),
]
