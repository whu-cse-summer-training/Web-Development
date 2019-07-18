from django.urls import path
from . import apiviews
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('recommand/', csrf_exempt(apiviews.RecommandView.as_view())),
    path('question/id=<int:qid>', csrf_exempt(apiviews.QuestionView.as_view())),
    path('answer/id=<int:aid>', csrf_exempt(apiviews.AnswerView.as_view())),
    path('good/id=<int:aid>', csrf_exempt(apiviews.GoodView.as_view())),
    path('bad/id=<int:aid>', csrf_exempt(apiviews.GoodView.as_view())),
    path('add_mylist/id=<int:aid>', csrf_exempt(apiviews.AddMylistView.as_view())),
    path('add_history/id=<int:aid>', csrf_exempt(apiviews.AddHistoryView.as_view())),
    path('add_question/', csrf_exempt(apiviews.AddQuestionView.as_view())),
    path('add_answer/id=<int:qid>', csrf_exempt(apiviews.AddAnswerView.as_view()))
]