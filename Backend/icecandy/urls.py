from django.urls import path
from icecandy import views

urlpatterns = [
    path('candy/', views.candy_list),
    path('icecandy/<int:pk>/', views.candy_detail),
]