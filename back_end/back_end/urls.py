"""back_end URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from . import views


#主页页面相关视图函数直接在.views中实现
#其他页面视图函数交给application.urls处理，在application.views实现
#所有api视图都以api/开头来命名，交给.apiurls处理
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('users.urls')),
    path('index/', include('users.urls')),
    path('api/', include('back_end.apiurls')),
    path('users/', include('users.urls')),
    path('content/', include('content.urls')),
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)\
    +static('index'+settings.STATIC_URL,document_root = settings.USERSSTATIC_ROOT)
