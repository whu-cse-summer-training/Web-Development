from django.urls import path, include
from . import apiviews

urlpatterns = [
    path('users/', include('users.apiurls')),
    path('content/', include('content.apiurls')),
]