from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Lecture
from .serializers import LectureSerializer, LectureCreateUpdateSerializer

# Create your views here.
class ListLecture(ListAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticated]


class CreateLecture(CreateAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

class RetrieveLecture(RetrieveAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticated]


class UpdateLecture(UpdateAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureCreateUpdateSerializer
    permission_classes = [IsAuthenticated]


class DestoryLecture(DestroyAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [IsAuthenticated]
