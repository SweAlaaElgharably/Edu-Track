from rest_framework.serializers import ModelSerializer
from .models import User
from university.serializers import UniversitySerializer
from faculty.serializers import FacultySerializer
from program.serializers import ProgramSerializer

class UserSerializer(ModelSerializer):
    university = UniversitySerializer(read_only=True)
    faculty = FacultySerializer(read_only=True)
    program = ProgramSerializer(read_only=True)

    class Meta:
        model = User
        fields = (
        "username", "first_name", "last_name", "email", "englishfullname", "address", "religion", "picture",
        "phonenumber", "birthday", "placeofbirth", "nationalid", "nationality", "zipcode",
        "gender", "maritalstatus", "groups",
        # nested related objects for profile display
        "university", "faculty", "program",
        )

    # The related fields are read-only; updates are handled via dedicated endpoints if needed.

