from django.db import models
from faculty.models import Faculty

# Create your models here.
class Program(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='programs')
    
    def __str__(self):
        return f"{self.name} ({self.faculty.name} - {self.faculty.university.name})"