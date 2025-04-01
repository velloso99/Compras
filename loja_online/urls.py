from django.urls import path
from .views import lista_links

urlpatterns = [
    path('', lista_links, name='lista_links'),
]