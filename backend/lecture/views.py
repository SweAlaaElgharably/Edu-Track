from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Lecture
from .serializers import LectureSerializer
from user.permissions import GroupPermission

# Create your views here.
class ListLecture(ListAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'lecture.get_lecture'})]


class CreateLecture(CreateAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'lecture.add_lecture'})]

class RetrieveLecture(RetrieveAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'lecture.get_lecture'})]


class UpdateLecture(UpdateAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'lecture.change_lecture'})]


class DestoryLecture(DestroyAPIView):
    queryset =  Lecture.objects.all()
    serializer_class = LectureSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'lecture.delete_lecture'})]
