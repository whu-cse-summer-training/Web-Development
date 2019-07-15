from django.urls import path, re_path
from . import apiviews

urlpatterns = [
    path('simple_info/', apiviews.SimpleInfoView.as_view()),
    path('id=<int:uid>', apiviews.ProfileView.as_view())
]