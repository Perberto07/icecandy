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
        
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.CharField(source='product.ProductFlavor')
    product_price = serializers.DecimalField(
        max_digits= 10,
        decimal_places= 2,
        source='product.Price',
    )
    
    class Meta:
        model = OrderItem
        fields = (  'product',
                    'product_price',
                    'quantity',
                    'item_subtotal')

class OrderSerializer(serializers.ModelSerializer):
    item = OrderItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField(method_name='total')
    customername = serializers.CharField(source='customername.customername')
   

    def total(self, obj):
      order_items = obj.item.all()
      return sum(item.item_subtotal for item in order_items)
    
    class Meta:
        model = Order
        fields = (  'OrderId',
                    'created_at',
                    'customername',
                    'item',
                    'status',
                    'total_price')
        

