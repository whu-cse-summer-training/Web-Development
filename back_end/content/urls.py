from django.urls import path
from . import views

app_name = 'content'
urlpatterns = [
    path('question/id=<int:qid>', views.question, name = 'question_page'),
    path('answer/id=<int:aid>', views.answer, name = 'answer_page')
]