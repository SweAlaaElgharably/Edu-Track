from rest_framework.serializers import ModelSerializer
from .models import Program
from rest_framework import serializers
from faculty.models import Faculty

class ProgramSerializer(ModelSerializer):
    faculty = serializers.PrimaryKeyRelatedField(queryset=Faculty.objects.all())

    class Meta:
        model = Program
        fields = '__all__'
        depth = 2