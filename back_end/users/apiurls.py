from django.urls import path
from . import apiviews

urlpatterns = [
    path('simple_info/', apiviews.SimpleInfoView.as_view())
]