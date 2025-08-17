from rest_framework import serializers
from .models import Lecture
from course.serializers import CourseSerializer
from user.serializers import UserSerializer
from location.serializers import LocationSerializer

class LectureCreateUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = ['course', 'instructor', 'location', 'day', 'starttime', 'endtime']
        read_only_fields = ['students']

    def validate(self, data):
        pk = self.instance.pk if self.instance else None 
        instructor = data.get('instructor')
        location = data.get('location')
        day = data.get('day')
        start = data.get('starttime')
        end = data.get('endtime')
        if Lecture.objects.filter(instructor=instructor, day=day, starttime__lt=end, endtime__gt=start).exclude(pk=pk).exists():
            raise serializers.ValidationError("Instructor has another lecture at this time.")
        if Lecture.objects.filter(location=location, day=day, starttime__lt=end, endtime__gt=start).exclude(pk=pk).exists():
            raise serializers.ValidationError("Location is occupied at this time.")
        return data

class LectureSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    instructor = UserSerializer(read_only=True)
    location = LocationSerializer(read_only=True)
    
    class Meta:
        model = Lecture
        fields = '__all__'
