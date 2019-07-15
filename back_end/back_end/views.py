from django.shortcuts import render
from django.conf import settings
#测试
def index(request):

    return render(request, 'index.html')

def community(request):
    return render(request, 'community.html')