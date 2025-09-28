# Cartify
## Overview
- Cartify is a full-stack e-commerce web application built with a **Flask backend** and a **React frontend**.  
- It allows users to browse products, manage shopping carts, and place orders while handling authentication, validation, and persistence.  
- This project demonstrates full-stack engineering skills by integrating:  
- A Flask REST API backend with SQLAlchemy models and relationships.  
- A React frontend with multiple routes, forms, and client-side navigation.  
- CRUD operations, form validation, and database persistence.  

### Backend (Flask)
- REST API with **CRUD operations** (GET, POST, PATCH, DELETE).  
- **Three+ models** (User, Product, Order, CartItem) with relationships:  
  - One-to-many: User → Orders, Product → CartItems.  
  - Many-to-many: Orders ↔ Products through CartItem, with extra attributes (quantity).  
- Database seeding with `seed.py`.  
- Authentication routes (`auth.py`).  
- SQLAlchemy with Marshmallow serialization.  
- Proper HTTP status codes and CORS enabled.  

### Frontend (React)
- **Multiple routes** handled via React Router (Home, Products, Product Detail, Cart, Orders, Auth).  
- **Reusable components**: `NavBar`, product cards, forms.  
- **Formik forms** with validation for signup, login, and product submission.  
- Validations:  
  - Data type (e.g., price must be a number).  
  - String/number format (e.g., email validation, password length).  
- State management using hooks.  
- Fetch API integration with the Flask backend.  


## Tech Stack
- **Frontend**: React, Vite, Formik, Yup, React Router, Fetch API  
- **Backend**: Flask, Flask-SQLAlchemy, Flask-Migrate, Flask-CORS, Marshmallow  
- **Database**: SQLite (dev)  


## Project Structure

### Frontend (`Cartify-Frontend/`)
Cartify-Frontend/
├── public/
├── src/
│ ├── App.jsx
│ ├── App.css
│ ├── main.jsx
│ ├── index.css
│ ├── Styles.css
│ ├── assets/
│ ├── services/ # API service helpers
│ ├── components/
│ │ └── NavBar.jsx
  | ├──AddToCartButton.jsx
  | ├──CartItemControls.jsx
│ └── pages/
│ ├── HomePage.jsx
│ ├── ProductsPage.jsx
│ ├── ProductDetail.jsx
│ ├── ProductForm.jsx
│ ├── CartPage.jsx
│ ├── OrdersPage.jsx
│ ├── LoginPage.jsx
│ └── SignupPage.jsx
├── package.json
├── vite.config.js
├──index.html
├──netlify.toml

### Backend (`Cartify-Backend/`)
Cartify-Backend/
├── migrations/
├── server/
│ ├── app.py # Flask entry point
│ ├── init.py
│ ├── models.py # SQLAlchemy models (User,Product, OrderCartItem)
│ ├── routes/
| |    |──auth.py # Authentication routes
| |    ├──cart.py
| |    ├──orders.py
| |    ├──products.py
| |    ├──users.py
│ ├── seed.py # Database seeding script
│ ├── store.db # SQLite database
│ ├── instance/ # Flask instance config
| ├──extensions.py
│ └── pycache/
├── Pipfile
├── Pipfile.lock
├── requirements.txt
├──.render.yaml
├──.tables
├──.env
├──gitignore


## Database Schema

### Models and Relationships
- **User**  
  - id, username, email, password_hash  
  - One-to-many with Orders  

- **Product**  
  - id, name, price, created_at  
  - One-to-many with CartItems  

- **Order**  
  - id, user_id, created_at  
  - Many-to-many with Products via CartItems  

- **CartItem (association table)**  
  - id, order_id, product_id, quantity  
  - Extra field: `quantity` (user-submittable attribute)  

---

## API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| GET    | /products        | Get all products           |
| POST   | /products        | Add new product            |
| GET    | /products/:id    | Get single product         |
| PATCH  | /products/:id    | Update product             |
| DELETE | /products/:id    | Delete product             |
| GET    | /orders          | Get user orders            |
| POST   | /orders          | Place new order            |
| GET    | /cart            | Get current cart           |
| POST   | /cart            | Add item to cart           |
| PATCH  | /cart/:id        | Update cart item quantity  |
| DELETE | /cart/:id        | Remove item from cart      |
| POST   | /signup          | Register new user          |
| POST   | /login           | User login                 |

---
## Running the Project

### Backend Setup

- cd Cartify-Backend
- pip install -r requirements.txt
- flask db upgrade
- python server/seed.py
- flask run

### Frontend Setup
- cd Cartify-Frontend
- npm install
- npm run dev

### Port
- The frontend runs on http://localhost:5173 and connects to the backend API at http://localhost:5000.

## Validation Examples

# Signup Form (Formik + Yup):

- Email must match valid format.

-Password must be at least 6 characters.

# Product Form:

- Name is required.

- Price must be a number greater than 0.

## Rubric Mapping

- Flask (8 pts): Supports GET, POST, PATCH, DELETE with correct status codes and CORS.

- SQLAlchemy & Serialization (8 pts): 4 models, 2 one-to-many, 1 many-to-many, Marshmallow serialization.

- Forms & Validation (6 pts): Formik used for signup, login, product form. Includes type and format validations.

- React Routes (8 pts): 7+ pages, NavBar for navigation, fetch connects frontend and backend.

## Future Improvements

- Payment gateway integration

- Role-based authentication (admin, customer)

- Product categories and search