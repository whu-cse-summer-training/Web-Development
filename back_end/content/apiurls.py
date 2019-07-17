from django.urls import path
from . import apiviews

urlpatterns = [
    path('recommand/', apiviews.RecommandView.as_view()),
    path('question/id=<int:qid>', apiviews.QuestionView.as_view())
]