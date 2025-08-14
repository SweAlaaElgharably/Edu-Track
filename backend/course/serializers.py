from rest_framework.serializers import ModelSerializer
from .models import Course
from rest_framework import serializers
from program.models import Program

class CourseSerializer(ModelSerializer):
    programs = serializers.PrimaryKeyRelatedField(queryset=Program.objects.all(), many=True)

    class Meta:
        model = Course
        fields = '__all__'
        depth = 2