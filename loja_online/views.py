from django.shortcuts import render
from .models import link
from django.http import HttpResponse

def lista_links(request):
    links = link.objects.all()
    return render(request, 'loja_online/lista_links.html', {'links': links})
    
def index(re1quest):
    return HttpResponse("Hello, world. You're at the loja_online index.")