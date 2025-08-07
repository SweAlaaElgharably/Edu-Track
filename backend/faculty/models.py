from django.db import models
from django.utils.text import slugify
from university.models import University

class Faculty(models.Model):
    name = models.CharField(max_length=30)
    slug = models.SlugField(max_length=30, unique=True, blank=True)
    logo = models.ImageField(upload_to='faculties')
    university = models.ForeignKey(University, on_delete=models.CASCADE, related_name='faculties')

    class Meta:
        verbose_name_plural = "Faculties"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        original_slug = self.slug
        counter = 1
        while Faculty.objects.filter(slug=self.slug).exclude(pk=self.pk).exists():
            self.slug = f'{original_slug}-{counter}'
            counter += 1

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.university.name})"