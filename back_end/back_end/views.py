from django.shortcuts import render

#测试
def index(request):
    return render(request, 'index.html')

def community(request):
    return render(request, 'community.html')