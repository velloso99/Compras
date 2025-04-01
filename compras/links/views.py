from django.shortcuts import render
from .models import link


def lista_links(request):
    links = link.objects.all()
    return render(request, "links/lista_links.html", {'links': links})


