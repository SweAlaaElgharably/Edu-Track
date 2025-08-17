from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Program
from .serializers import ProgramSerializer
from  user.permissions import GroupPermission

class ListProgram(ListAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'program.view_program'})]

class CreateProgram(CreateAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'program.add_program'})]

class RetrieveProgram(RetrieveAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'program.view_program'})]

class UpdateProgram(UpdateAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'program.change_program'})]

class DestoryProgram(DestroyAPIView):
    queryset =  Program.objects.all()
    serializer_class = ProgramSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'program.delete_program'})]
