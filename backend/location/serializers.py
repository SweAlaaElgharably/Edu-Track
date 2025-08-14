from rest_framework.serializers import ModelSerializer
from .models import Location
from rest_framework import serializers
from faculty.models import Faculty

class LocationSerializer(ModelSerializer):
    faculty = serializers.PrimaryKeyRelatedField(queryset=Faculty.objects.all())

    class Meta:
        model = Location
        fields = '__all__'
        depth = 2