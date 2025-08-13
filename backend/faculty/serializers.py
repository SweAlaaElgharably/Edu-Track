from rest_framework.serializers import ModelSerializer
from .models import Faculty

class FacultySerializer(ModelSerializer):

    class Meta:
        model = Faculty
        fields = '__all__'
