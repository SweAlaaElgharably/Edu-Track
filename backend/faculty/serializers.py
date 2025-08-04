# faculty/serializers.py
from rest_framework import serializers
from .models import Faculty

class FacultySerializer(serializers.ModelSerializer):
    university_name = serializers.ReadOnlyField(source='university.name')

    class Meta:
        model = Faculty
        fields = [
            'id', 'name', 'slug', 'logo', 
            'university', 'university_name', 'owner',
        ]
        read_only_fields = ['slug', 'owner', 'created_at', 'updated_at']