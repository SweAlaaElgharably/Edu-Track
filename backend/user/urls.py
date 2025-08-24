from django.urls import path
from .views import GroupList, LogList

urlpatterns = [
    path("groups/", GroupList.as_view(), name="group-list"),
    path("logs/", LogList.as_view(), name="log-list"),
]

