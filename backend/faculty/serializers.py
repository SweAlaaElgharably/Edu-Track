from rest_framework import serializers
from .models import Faculty

class FacultySerializer(serializers.ModelSerializer):
    university_name = serializers.CharField(source='university.name', read_only=True)
    
    class Meta:
        model = Faculty
        fields = ['id', 'name', 'slug', 'logo', 'university', 'university_name']

        extra_kwargs = {
            'logo': {'required': False}
        }