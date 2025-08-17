from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Faculty
from .serializers import FacultySerializer
from  user.permissions import GroupPermission

class ListFaculty(ListAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'faculty.view_faculty'})]

class CreateFaculty(CreateAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'faculty.add_faculty'})]

class RetrieveFaculty(RetrieveAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'faculty.view_faculty'})]

class UpdateFaculty(UpdateAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'faculty.change_faculty'})]

class DestoryFaculty(DestroyAPIView):
    queryset =  Faculty.objects.all()
    serializer_class = FacultySerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'faculty.delete_faculty'})]



