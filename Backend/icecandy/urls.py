from django.urls import path
from icecandy import views

urlpatterns = [
    path('customer/', views.customer_list),
    path('customer/<int:pk>/', views.customer_detail),
    path('products/', views.product_list),
    path('products/<int:pk>/', views.product_detail),
    path('orders/', views.order_list),
]