from django.urls import path
from . import apiviews

urlpatterns = [
    path('recommand/', apiviews.RecommandView.as_view()),
    path('question/id=<int:qid>', apiviews.QuestionView.as_view()),
    path('answer/id=<int:aid>', apiviews.AnswerView.as_view()),
    path('good/id=<int:aid>', apiviews.GoodView.as_view()),
    path('bad/id=<int:aid>', apiviews.BadView.as_view()),
    path('add_mylist/id=<int:aid>', apiviews.AddMylistView.as_view()),
    path('add_history/id=<int:aid>', apiviews.AddHistoryView.as_view()),
    path('add_question/', apiviews.AddQuestionView.as_view()),
    path('add_answer/id=<int:qid>', apiviews.AddAnswerView.as_view()),
    path('comment/id=<int:aid>', apiviews.CommentView.as_view()),
    path('add_comment/id=<int:aid>', apiviews.AddCommentView.as_view())
]