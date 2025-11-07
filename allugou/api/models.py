from django.db import models
from django.contrib.auth.models import User

class Produto(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='produtos')
    titulo = models.CharField(max_length=100)
    categoria = models.CharField(max_length=50)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    imagem = models.ImageField(upload_to='produtos/', null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
