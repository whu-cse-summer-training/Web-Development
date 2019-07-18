from django.shortcuts import render

# Create your views here.
def question(request):
    return render(request, 'content/question.html')

def answer(request):
    return render(request, 'content/answer.html')