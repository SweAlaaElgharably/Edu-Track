from rest_framework import serializers
from .models import Lecture
from user.models import User
from location.models import Location

class LectureSerializer(serializers.ModelSerializer):
    instructor = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    location = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all())
    students = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), many=True, required=False)
    class Meta:
        model = Lecture
        fields = '__all__'

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
