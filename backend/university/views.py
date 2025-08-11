from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import University
from .serializers import UniversitySerializer
from  user.permissions import GroupPermission
from rest_framework.permissions import AllowAny

class ListUniversity(ListAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [AllowAny]

class CreateUniversity(CreateAPIView):
    queryset =  University.objects.all()
    serializer_class = UniversitySerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'university.add_university'})]


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



