from django.urls import path
from . import views

urlpatterns = [
    path('customers/', views.CustomerView.as_view(), name='customers'),
    path('products/', views.ProductView.as_view(), name='products'),
    path('bills/', views.BillView.as_view(), name='bills'),
    path('bills/<int:bill_id>/', views.BillView.as_view(), name='bill-detail'),
]