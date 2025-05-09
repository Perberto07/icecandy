from django.shortcuts import get_object_or_404
from icecandy.serializers import CustomerSerializer, ProductSerializer, OrderSerializer
from icecandy.models import Customer, Product, Order
from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def customer_list(request):
    customers = Customer.objects.all()
    serializer = CustomerSerializer(customers, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def customer_detail(request, pk):
    customer = get_object_or_404(Customer, pk=pk)
    serializer = CustomerSerializer(customer)
    return Response(serializer.data)

@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def product_detail(request, pk):
    product = get_object_or_404(Customer, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def orderlist(request, pk):
    product = get_object_or_404(Customer, pk=pk)
    serializer = ProductSerializer(product)
    return Response(serializer.data)

@api_view(['GET'])
def order_list(request):
    order = Order.objects.all()
    serializer = OrderSerializer(order, many=True)
    return Response(serializer.data)