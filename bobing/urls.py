"""bobing URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve

from boBingModel import views
from bobing import settings
from bobing.settings import MEDIA_ROOT

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usr/allPlayer', views.allPlayer),
    path('usr/addPlayer', views.addPlayer),
    path('usr/editPlayer', views.editPlayer),
    path('usr/deletePlayer', views.deletePlayer),
    path('usr/partPlayer', views.partPlayer),
    path('game/judge', views.judge),
    path('record/allRecord', views.allRecord),
    # path('record/addRecord', views.addRecord),
    path('rank/allRank', views.allRank),
    path('rank/nowRank', views.nowRank),
    re_path('^media/(?P<path>.*)$', serve, {"document_root": MEDIA_ROOT})
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
