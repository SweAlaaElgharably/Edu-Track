from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView, DestroyAPIView, UpdateAPIView
from .models import Location
from .serializers import LocationSerializer
from user.permissions import GroupPermission

# Create your views here.
class ListLocation(ListAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'location.get_location'})]

class CreateLocation(CreateAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'location.add_location'})]


class RetrieveLocation(RetrieveAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'location.get_location'})]


class UpdateLocation(UpdateAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'location.change_location'})]


class DestoryLocation(DestroyAPIView):
    queryset =  Location.objects.all()
    serializer_class = LocationSerializer
    lookup_field = "slug"
    permission_classes = [type('CustomPerm',(GroupPermission,),{'required_permission': 'location.delete_location'})]
