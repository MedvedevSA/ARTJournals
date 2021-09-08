from django.shortcuts import redirect
from django.shortcuts import render

# Create your views here.

def index (request, *args, **kwargs):
    return redirect("/journals")
