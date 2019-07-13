from django.shortcuts import render

# Create your views here.

def userspace(request):
    return render(request, 'users/userspace.html')