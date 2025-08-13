from django.db import models
from user.models import User
from location.models import Location

# Create your models here.
days = [
    ('السبت', 'السبت'), ('الأحد', 'الأحد'), ('الإثنين', 'الإثنين'), ('الثلاثاء', 'الثلاثاء'),
    ('الأربعاء', 'الأربعاء'), ('الخميس', 'الخميس'), ('الجمعة', 'الجمعة'),
]

class Lecture(models.Model):
    title = models.CharField(max_length=100)
    instructor = models.ForeignKey(User, on_delete=models.CASCADE)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    day = models.CharField(max_length=10, choices=days)
    starttime = models.TimeField()
    endtime = models.TimeField()
    students = models.ManyToManyField(User, related_name='lectures', null=True)

    def __str__(self):
        return self.title
    


