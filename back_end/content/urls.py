from django.urls import path
from . import views

#问题详情页，回答详情页
app_name = 'content'
urlpatterns = [
    path('question/id=<int:qid>', views.question, name = 'question_page'),
    path('answer/id=<int:aid>', views.answer, name = 'answer_page')
]