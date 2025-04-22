from django.urls import path
from icecandy import views

urlpatterns = [
    path('candy/', views.customer_list),
    path('candy/<int:pk>/', views.customer_detail),
]