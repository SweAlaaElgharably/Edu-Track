from django.db import models
from university.models import University

class Faculty(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=30, unique=True)
    logo = models.ImageField(upload_to='faculties')
    
    class Meta:
        verbose_name_plural = "Faculties"

    def __str__(self):
        return f"{self.name} ({self.university.name})"