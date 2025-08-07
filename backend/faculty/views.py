from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Faculty
from .serializers import FacultySerializer

class ListFaculty(ListAPIView):
    serializer_class = FacultySerializer
    
    def get_queryset(self):
        queryset = Faculty.objects.all()
        university_slug = self.request.query_params.get('university__slug', None)
        if university_slug:
            queryset = queryset.filter(university__slug=university_slug)
        return queryset

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

class DestroyFaculty(DestroyAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"



