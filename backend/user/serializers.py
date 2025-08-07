from rest_framework.serializers import ModelSerializer
from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username", "first_name", "last_name", "email", "englishfullname", "address", "religion", "picture", 
            "phonenumber", "birthday", "placeofbirth", "nationalid", "nationality", "zipcode", 
            "gender", "maritalstatus" 
        )

class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = User
        fields = ("id", "username", "first_name", "last_name", "email", "password", "re_password")

    def create(self, validated_data):
        print("Creating user with data:", validated_data)  # Debug print
        user = super().create(validated_data)
        print("Created user:", user.username, user.first_name, user.last_name)  # Debug print
        return user

    #program
    #faculty
    #university

