from django.db import models
 
class Task(models.Model):
    task = models.CharField(max_length = 255)
    description = models.CharField(max_length = 255)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.BooleanField(default=False) 