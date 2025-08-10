from django.db import models
from program.models import Program

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    programs = models.ManyToManyField(Program, related_name='courses')

    def __str__(self):
        return self.title