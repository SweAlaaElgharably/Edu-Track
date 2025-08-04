from rest_framework.serializers import ModelSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
<<<<<<< HEAD
            "first_name", "last_name", "email", "englishfullname", "address", "gender", "marital_status", "religion", "picture", "phonenumber", "birthday", "placeofbirth", "nationalid", "nationality", "zipcode", "gender", "maritalstatus", "religion" 
=======
            "username", "first_name", "last_name", "email", "englishfullname", "address", "religion", "picture", 
            "phonenumber", "birthday", "placeofbirth", "nationalid", "nationality", "zipcode", 
            "gender", "maritalstatus" 
>>>>>>> main
        )

    #program
    #faculty
    #university

