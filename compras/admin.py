from django.contrib import admin
from .models import produtos

@admin.register(produtos)
class ProdutosAdmin(admin.ModelAdmin):
    list_display = ('nome', 'link_externo', 'imagem')
    search_fields = ('nome',)
    list_filter = ('nome',)
    ordering = ('nome',)
    list_per_page = 10
