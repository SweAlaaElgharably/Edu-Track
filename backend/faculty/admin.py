from django.contrib import admin

# Register your models here.
# faculty/admin.py
from django.contrib import admin
from .models import Faculty

@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ('name', 'university', 'owner')
    search_fields = ('name', 'university__name')