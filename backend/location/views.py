from django.shortcuts import render

# Create your views here.
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Location
from .serializers import LocationSerializer


class ListLocation(ListAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer

class CreateLocation(CreateAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer

class RetrieveLocation(RetrieveAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = "slug"

class UpdateLocation(UpdateAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = "slug"

class DestoryLocation(DestroyAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = "slug"



