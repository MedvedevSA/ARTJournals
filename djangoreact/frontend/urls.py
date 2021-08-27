from django.urls import path
from .views import index

urlpatterns = [
    path('/', index),
    path('/test', index),
    path('/group/<int:id>', index),
    path('/batch/<int:id>', index)
]