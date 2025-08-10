from django.db import models
from faculty.models import Faculty

# Create your models here.
class Location(models.Model):
    name = models.CharField(max_length=50, unique=True)
    slug = models.SlugField(unique=True)
    capacity = models.PositiveIntegerField(default=1)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE, related_name='locations')

    def __str__(self):
        return f"{self.name} ({self.faculty.name})"