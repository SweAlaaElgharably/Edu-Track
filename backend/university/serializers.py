# university/serializers.py
from rest_framework import serializers
from .models import University
from django.contrib.auth import get_user_model

User = get_user_model()

class UniversitySerializer(serializers.ModelSerializer):
   
    class Meta:
        model = University
        fields = ['id', 'name', 'slug', 'logo', 'owner']
        read_only_fields = ['slug', 'owner']