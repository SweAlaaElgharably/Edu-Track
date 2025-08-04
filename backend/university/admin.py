# university/admin.py
from django.contrib import admin
from .models import University
from django.utils.html import format_html

@admin.register(University)
class UniversityAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner')
