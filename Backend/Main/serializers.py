from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class BillItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    product_price = serializers.DecimalField(source="product.price", max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = BillItem
        fields = ["id", "product", "quantity", "total_price", "product_name", "product_price"]
        read_only_fields = ["total_price"]
        
class BillSerializer(serializers.ModelSerializer):
    items = BillItemSerializer(many=True)
    total_amount = serializers.ReadOnlyField()
    total_items = serializers.ReadOnlyField()
    customer_name = serializers.CharField(source="customer.name", read_only=True)
    customer_mobile = serializers.CharField(source="customer.mobile", read_only=True)

    class Meta:
        model = Bill
        fields = ["id", "customer", "customer_name", "customer_mobile", "date", "items", "total_amount", "total_items"]


    def create(self, validated_data):
        items_data = validated_data.pop("items")
        bill = Bill.objects.create(**validated_data)
        for item_data in items_data:
            BillItem.objects.create(bill=bill, **item_data)
        return bill
