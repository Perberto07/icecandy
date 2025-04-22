from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles

# Create your models here.
class customer(models.Model):
    id= models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    address = models.TextField(max_length=200)
    
    def __str__(self):
        return self.name