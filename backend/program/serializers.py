from rest_framework import serializers
from .models import Program

class ProgramSerializer(serializers.ModelSerializer):
    # owner = serializers.ReadOnlyField(source='owner.username')  # Temporarily commented to break migration cycle

    class Meta:
        model = Program
        fields = ['id', 'name', 'slug', 'owner', 'faculty']
        read_only_fields = ['owner']
