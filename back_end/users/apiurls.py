from django.urls import path, re_path
from . import apiviews
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('simple_info/', csrf_exempt(apiviews.SimpleInfoView.as_view())),
    path('id=<int:uid>', csrf_exempt(apiviews.ProfileView.as_view())),
    path('edit_profile/id=<int:uid>', csrf_exempt(apiviews.EditProfileView.as_view())),
    path('mylist/id=<int:uid>', csrf_exempt(apiviews.MylistView.as_view())),
    path('history/id=<int:uid>', csrf_exempt(apiviews.HistoryView.as_view())),
    path('question/id=<int:uid>', csrf_exempt(apiviews.MyQuestionView.as_view())),
    path('answer/id=<int:uid>', csrf_exempt(apiviews.MyAnswerView.as_view())),
    path('login/', csrf_exempt(apiviews.LoginView.as_view())),
]