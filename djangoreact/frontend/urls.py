from django.urls import path
from django.urls import re_path
from .views import index

urlpatterns = [
    path('/', index),
    path('/test', index),
    path('/batch/<int:id>', index),
    path('/group/<int:id>', index),
    path('/cncinfo/', index),
    re_path(r'^(.*)$',index)    
]