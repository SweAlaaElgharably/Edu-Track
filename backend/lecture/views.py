from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Lecture
from .serializers import LectureSerializer

# Create your views here.

class ListLecture(ListAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer

class CreateLecture(CreateAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer

class RetrieveLecture(RetrieveAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer

class UpdateLecture(UpdateAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer

class DestoryLecture(DestroyAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer



