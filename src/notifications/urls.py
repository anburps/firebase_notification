# urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('save_fcm_token/', views.save_fcm_token, name='save_fcm_token'),
    path('create_product/', views.create_product, name='create_product'),
]
