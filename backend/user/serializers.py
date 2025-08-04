from rest_framework.serializers import ModelSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            "username", "first_name", "last_name", "email", "englishfullname", "address", "religion", "picture", 
            "phonenumber", "birthday", "placeofbirth", "nationalid", "nationality", "zipcode", 
            "gender", "maritalstatus" 
        )

    #program
    #faculty
    #university

