from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    englishfullname = models.CharField(max_length=50, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    picture = models.ImageField(upload_to="pictures", blank=True, null=True)
    phonenumber = models.CharField(max_length=11, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    placeofbirth = models.CharField(max_length=15, blank=True, null=True)
    nationalid = models.CharField(max_length=14, blank=True, null=True)
    nationality = models.CharField(max_length=20, blank=True, null=True)
    zipcode = models.CharField(max_length=8, blank=True, null=True)
    gender = models.CharField(max_length=4, choices=[('ذكر', 'ذكر'), ('أنثى', 'أنثى')], blank=True, null=True)
    maritalstatus = models.CharField(max_length=6, choices=[('أعزب', 'أعزب'), ('عزباء', 'عزباء'), ('متزوج', 'متزوج'), ('متزوجة', 'متزوجة'), ('مطلق', 'مطلق'), ('مطلقة', 'مطلقة'), ('أرمل', 'أرمل'), ('أرملة', 'أرملة')], blank=True, null=True)
    religion = models.CharField(max_length=20, choices=[('مسلم', 'مسلم'), ('مسيحي', 'مسيحي')], blank=True, null=True)
    #program
    #faculty
    #university

    def __str__(self):
        return self.username
    
    
    