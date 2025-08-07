from django.db import models

class University(models.Model):    
    name = models.CharField(max_length=15, unique=True)
    slug = models.SlugField(max_length=20, unique=True)  
    logo = models.ImageField(upload_to='universities')

    class Meta:
        verbose_name_plural = "Universities" 
    
    def __str__(self):
        return self.name
    
