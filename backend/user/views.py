from rest_framework import generics
from django.contrib.auth.models import Group
from .serializers import GroupSerializer, LogSerializer
from django.contrib.admin.models import LogEntry

# Create your views here.
class GroupList(generics.ListAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class LogList(generics.ListAPIView):
    queryset = LogEntry.objects.all().order_by("-action_time")
    serializer_class = LogSerializer
