from rest_framework import serializers
from .models import Program

class ProgramSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Program
        fields = ['id', 'name', 'slug', 'owner', 'faculty']
        read_only_fields = ['owner']
