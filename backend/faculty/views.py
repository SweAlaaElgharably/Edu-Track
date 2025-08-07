from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Faculty
from .serializers import FacultySerializer

class ListFaculty(ListAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer

class CreateFaculty(CreateAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer

class RetrieveFaculty(RetrieveAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"

class UpdateFaculty(UpdateAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"

class DestoryFaculty(DestroyAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"



