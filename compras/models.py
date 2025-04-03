from django.db import models

class produtos(models.Model):
    nome = models.CharField(max_length=255)
    link_externo = models.URLField()
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)
    
    def __str__(self):
        return self.nome
