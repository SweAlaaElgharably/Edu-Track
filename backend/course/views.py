from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Course
from .serializers import CourseSerializer
from  user.permissions import GroupPermission
from rest_framework.permissions import IsAuthenticated

# Create your views here.
class ListCourse(ListAPIView):
    queryset =  Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

class CreateCourse(CreateAPIView):
    queryset =  Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'course.add_course'})]


class RetrieveCourse(RetrieveAPIView):
    queryset =  Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'course.get_course'})]

class UpdateCourse(UpdateAPIView):
    queryset =  Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'course.change_course'})]

class DestoryCourse(DestroyAPIView):
    queryset =  Course.objects.all()
    serializer_class = CourseSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'course.delete_course'})]




