from rest_framework.serializers import ModelSerializer
from .models import Faculty

class FacultySerializer(ModelSerializer):

    class Meta:
        model = Faculty
        fields = [
            'id', 'name', 'slug', 'logo', 
            'university', 'university_name', 'owner',
        ]
        read_only_fields = ['slug', 'owner', 'created_at', 'updated_at']