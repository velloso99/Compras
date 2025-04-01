from django.db import models

class link(models.Model):
    titulo = models.CharField(max_length=255)
    url = models.URLField()
    
    def __str__(self):
        return self.titulo
