from django.shortcuts import render
from .models import link

def lista_links(request):
    links = link.objects.all()
    return render(request, 'loja_online/lista_links.html', {'links': links})
    
