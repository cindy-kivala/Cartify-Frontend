# 🛒 Cartify – Full-Stack E-Commerce Application  

## 📌 Overview  
Cartify is a full-stack e-commerce application built with:  
- **Backend:** Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-Bcrypt, Flask-CORS  
- **Frontend:** React (Vite), React Router, Formik for forms, Axios for API calls  
- **Database:** SQLite (default, can switch to PostgreSQL/MySQL)  

It allows users to:  
✅ Sign up / Log in with authentication  
✅ Browse products  
✅ Add products to cart  
✅ Place orders  
✅ Manage cart items  

---

## ⚙️ Features  
- **Users** can sign up, log in, and manage their cart & orders.  
- **Products** have stock validation, categories, brand, description, and pricing.  
- **Cart Items** link users and products (with quantity).  
- **Orders** allow checkout with many-to-many relation between products and orders via `OrderItem`.  
- Full CRUD on Products.  
- Read & Create for Users, CartItems, Orders.  
- Validations: price > 0, stock ≥ 0, email uniqueness.  
- Formik forms with validation in frontend.  
- React Router navigation (Home, Products, Cart, Orders).  

---

## 🗂️ Project Structure  

### Backend (`Cartify-Backend/`)
server/
│── app.py             # Flask app factory
│── models.py          # SQLAlchemy models
│── auth.py            # Authentication routes
│── routes/            # API routes
│── seed.py            # Database seeding
│── migrations/        # Flask-Migrate versions


### Frontend (`Cartify-Frontend/`)
src/
│── App.jsx
│── components/
│── pages/
│── services/

---

## 🚀 Setup Instructions  

### Backend
cd Cartify-Backend
pip install -r requirements.txt
flask db upgrade
python -m server.app

## FrontEnd
cd Cartify-Frontend
npm install
npm run dev

🛠️ Tech Stack

Backend: Flask, SQLAlchemy, Bcrypt, CORS, Migrate

Frontend: React, Formik, React Router, Axios, Toast

Database: SQLite 


📚 Learning Goals Achieved

✅ Flask API backend with React frontend
✅ At least three models (User, Product, Order, CartItem, OrderItem)
✅ Two one-to-many relationships (User → CartItem, User → Order, Product → CartItem)
✅ One reciprocal many-to-many relationship (Order ↔ Product via OrderItem)
✅ Full CRUD on Products
✅ Create & Read on Users, Cart, Orders
✅ Validations for data types, string formats, numbers
✅ Client routes with React Router
✅ Forms with Formik & validations
✅ Connected frontend & backend with Axios


### 🖼️ Installation Guide with Screenshots
## 1. Clone the repository
git clone https://github.com/your-username/Cartify.git
cd Cartify


## 2. Backend Setup
cd Cartify-Backend
pip install -r requirements.txt
flask db upgrade
python -m server.app

## 3. Frontend Setup
cd Cartify-Frontend
npm install
npm run dev

