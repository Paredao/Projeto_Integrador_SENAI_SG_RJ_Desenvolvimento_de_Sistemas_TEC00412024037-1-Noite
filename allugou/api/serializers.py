from rest_framework import serializers
from .models import Produto

class ProdutoSerializer(serializers.ModelSerializer):
    usuario = serializers.ReadOnlyField(source='usuario.username')
    
    class Meta:
        model = Produto
        fields = '__all__'
