from rest_framework import serializers
from icecandy.models import Customer, Product, Order, OrderItem

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = (  'id',
                    'customername', 
                    'phone', 
                    'address')
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = (  'ProductNo',
                    'ProductFlavor', 
                    'stock', 
                    'Price',
                    'image')


