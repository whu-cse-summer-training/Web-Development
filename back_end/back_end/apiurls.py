from django.urls import path, include
from . import apiviews

#所有的api视图函数都从这里开始route
#主页的api在.apiviews中实现
#其他的api分配到各应用的apiurls处理，在application.apiviews中实现
urlpatterns = [
    path('users/', include('users.apiurls')),
    path('content/', include('content.apiurls')),
]