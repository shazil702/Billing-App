A simple Billing Invoice Application built with Django REST Framework (backend) and React + Tailwind CSS (frontend).

This app allows you to:

Add Customers

Add Products

Create Bills (Invoices) by selecting a customer and products with quantities

View Bill details with customer info, product list, and totals

List all Bills

🚀 Features

Customer management (Add, List)

Product management (Add, List)

Bill (Invoice) creation with multiple products

Invoice summary with total items and final amount

List all bills with option to view details

API built using Django REST Framework

Frontend built using React (with Tailwind CSS for styling)

🛠 Tech Stack

Backend: Django, Django REST Framework, PostgreSQL

Frontend: React, Axios, Tailwind CSS, React Router

⚙️ Installation & Setup
1️⃣ Backend (Django + DRF)
# Clone the repository
git clone https://github.com/your-username/billing-app.git
cd billing-app/Backend

# Create virtual environment
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Start development server
python manage.py runserver


Backend runs at: http://127.0.0.1:8000/

2️⃣ Frontend (React + Tailwind)
cd ../Frontend

# Install dependencies
npm install

# Start development server
npm run dev


Frontend runs at: http://localhost:5173/
 (Vite default)

🔗 API Endpoints
Customers

GET /api/customers/ → List customers

POST /api/customers/ → Add new customer

Sample Request:

{
  "name": "John Doe",
  "mobile": "9876543210"
}

Products

GET /api/products/ → List products

POST /api/products/ → Add new product

Sample Request:

{
  "name": "Laptop",
  "price": "50000.00"
}

Bills

GET /api/bills/ → List all bills

POST /api/bills/ → Create new bill with items

GET /api/bills/{id}/ → Get details of a specific bill

Sample Create Bill Request:

{
  "customer": 1,
  "items": [
    { "product": 2, "quantity": 3 },
    { "product": 5, "quantity": 1 }
  ]
}


Sample Response:

{
  "id": 1,
  "customer": 1,
  "customer_name": "John Doe",
  "customer_mobile": "9876543210",
  "date": "2025-09-27",
  "items": [
    { "id": 1, "product": 2, "product_name": "Laptop", "price": "50000.00", "quantity": 3, "total_price": "150000.00" },
    { "id": 2, "product": 5, "product_name": "Mouse", "price": "500.00", "quantity": 1, "total_price": "500.00" }
  ],
  "total_items": 4,
  "total_amount": "150500.00"
}

🖥 Frontend Pages

Home Page → Select customer, add products, create invoice

Add Customer Page → Form to add customer

Add Product Page → Form to add product

Bills List Page → Show all bills with details button

Invoice Details Page → Show invoice summary (customer, products, totals)

📌 Future Improvements

Export Invoice as PDF

Authentication for admin/users

Search & filter bills

Dashboard with charts

👤 Author

Developed by Your Name

Email: shazilva2@gmail.com

GitHub: shazil702
