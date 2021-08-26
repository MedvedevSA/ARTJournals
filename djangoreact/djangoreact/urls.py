from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage


urlpatterns = [
    path('journals', include('frontend.urls')),
    path(
        "favicon.ico",
        RedirectView.as_view(url=staticfiles_storage.url("favicon.ico")),
    ),
]
