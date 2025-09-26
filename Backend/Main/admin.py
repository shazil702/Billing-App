from django.contrib import admin
from .models import Customer, Product, Bill, BillItem

admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Bill)
admin.site.register(BillItem)
# Register your models here.
