from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Program
from .serializers import ProgramSerializer

class ListProgram(ListAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer

class CreateProgram(CreateAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer

class RetrieveProgram(RetrieveAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"

class UpdateProgram(UpdateAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"

class DestoryProgram(DestroyAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"



