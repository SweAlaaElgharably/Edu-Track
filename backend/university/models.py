import uuid
from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied


class University(models.Model):
   
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(max_length=255, unique=True, blank=True)  # Keep this field!
    logo = models.ImageField(upload_to='university_logos/', blank=True, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='owned_universities'
    )
    class Meta:
        verbose_name_plural = "Universities"
     
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            
            while University.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        
        super().save(*args, **kwargs)
    
    @classmethod
    def get_by_slug(cls, slug):
        """
        Get a university by slug.
        """
        return get_object_or_404(cls, slug=slug)