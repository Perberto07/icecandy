import uuid
from django.db import models
from pygments.lexers import get_all_lexers
from pygments.styles import get_all_styles


# Create your models here.
class Customer(models.Model):
    id= models.AutoField(primary_key=True)
    customername = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    address = models.TextField(max_length=200)
    
    def __str__(self):
        return self.customername

class Product(models.Model):
    ProductNo = models.AutoField(primary_key=True)
    ProductFlavor = models.CharField(max_length=30)
    stock = models.PositiveIntegerField()
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', blank=True, null=True)

    @property
    def in_stock(self):
        return self.stock > 0
        
    def __str__(self):
        return self.ProductFlavor
    

class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING =  'Pending'
        COMPLETED = 'Completed'
        CANCELLED = 'Cancelled'

    OrderId  = models.UUIDField(primary_key=True, default=uuid.uuid4,)
    customername = models.ForeignKey(Customer, on_delete=models.CASCADE) 
    created_at = models.DateTimeField(auto_now_add=True)    
    status = models.CharField(
        max_length=10,
        choices=StatusChoices.choices,
        default=StatusChoices.PENDING,
    )
    products = models.ManyToManyField(Product, through='OrderItem', related_name='orders')

    def __str__(self):
        return f'Order {self.OrderId} - {self.customername}'
    
class OrderItem(models.Model): 
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='item')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    @property
    def item_subtotal(self):
        return self.product.Price * self.quantity
    
    def __str__(self):
        return f'{self.product.ProductFlavor} - {self.quantity} in {self.order.OrderId}'