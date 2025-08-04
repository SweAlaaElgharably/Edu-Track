# faculty/models.py
import uuid
from django.db import models
from django.utils.text import slugify
from django.conf import settings
from django.shortcuts import get_object_or_404
from university.models import University

class Faculty(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    logo = models.ImageField(upload_to='faculty_logos/', blank=True, null=True)
    university = models.ForeignKey(
        University,
        on_delete=models.CASCADE,
        related_name='faculties'
    )
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='owned_faculties'
    )
    class Meta:
        verbose_name_plural = "Faculties"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} ({self.university.name})"

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            
            while Faculty.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            
            self.slug = slug
        super().save(*args, **kwargs)

    @classmethod
    def get_by_slug(cls, slug):
        return get_object_or_404(cls, slug=slug)