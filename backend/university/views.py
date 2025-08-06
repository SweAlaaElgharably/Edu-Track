from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import University
from .serializers import UniversitySerializer

class ListUniversity(ListAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer

class CreateUniversity(CreateAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer

class RetrieveUniversity(RetrieveAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer
    lookup_field = "slug"

class UpdateUniversity(UpdateAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer
    lookup_field = "slug"

class DestoryUniversity(DestroyAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer
    lookup_field = "slug"



