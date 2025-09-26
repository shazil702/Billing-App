from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import Customer, Product, Bill, BillItem
from .serializers import CustomerSerializer, ProductSerializer, BillSerializer, BillItemSerializer

class CustomerView(APIView):
    def get(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BillView(APIView):
    def get(self, request, bill_id=None):
        if bill_id:
            try:
                bill = Bill.objects.prefetch_related("items").get(id=bill_id)
                serializer = BillSerializer(bill)
                return Response(serializer.data)
            except Bill.DoesNotExist:
                return Response({"error": "Bill not found"}, status=status.HTTP_404_NOT_FOUND)
        bills = Bill.objects.all().prefetch_related("items")
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            bill = serializer.save()
            return Response(BillSerializer(bill).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
