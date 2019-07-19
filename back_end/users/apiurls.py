from django.urls import path, re_path
from . import apiviews


#简易个人信息，详细个人信息，编辑个人信息，收藏夹，历史记录，我的提问，我的回答，登录
urlpatterns = [
    path('simple_info/', apiviews.SimpleInfoView.as_view()),
    path('id=<int:uid>', apiviews.ProfileView.as_view()),
    path('edit_profile/id=<int:uid>', apiviews.EditProfileView.as_view()),
    path('mylist/id=<int:uid>', apiviews.MylistView.as_view()),
    path('history/id=<int:uid>', apiviews.HistoryView.as_view()),
    path('question/id=<int:uid>', apiviews.MyQuestionView.as_view()),
    path('answer/id=<int:uid>', apiviews.MyAnswerView.as_view()),
    path('login/', apiviews.LoginView.as_view()),
]