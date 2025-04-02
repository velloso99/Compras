from django.db import models

class produto(models.Model):
    nome = models.CharField(max_length=255)
    descrição = models.TextField()
    preço = models.DecimalField(max_digits=10, decimal_places=2)
    link_externo = models.URLField()
    imagem = models.ImageField(upload_to='produtos/', blank=True, null=True)
    data_criação = models.DateTimeField(auto_now_add=True)
    data_atualização = models.DateTimeField(auto_now=True)
    ativo = models.BooleanField(default=True)
    categoria = models.ForeignKey('Categoria', on_delete=models.CASCADE, related_name='produtos')
    
    class Meta:
        verbose_name = 'Produto'
        verbose_name_plural = 'Produtos'
        ordering = ['nome']
    

    def __str__(self):
        return self.nome