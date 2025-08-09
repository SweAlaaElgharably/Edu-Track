import uuid
from django.conf import settings
from django.db import models
from django.utils.text import slugify
from faculty.models import Faculty

# Adjust the import based on your project structure


class Program(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name=models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    # owner = models.ForeignKey(
    #     settings.AUTH_USER_MODEL,
    #     on_delete=models.CASCADE,
    #     related_name='owned_programs',
    #     null=True
    # )  # Temporarily removed to break migration cycle
    faculty = models.ForeignKey(
    'faculty.Faculty',
    on_delete=models.CASCADE,
    related_name='programs',
)

    def __str__(self):
        return self.name
    
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            
            while Program.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
        
        
        
        
# Create your models here.
