# 🏠 Bachelor Rental Platform

A full-stack web application that helps **bachelor tenants find rental properties** easily and allows **landlords to list and manage their properties**.

This platform simplifies the rental search process by providing filters, contact requests, saved listings, and a landlord dashboard.

---

# 🚀 Features

## 👤 User Authentication

* User registration and login
* JWT based authentication
* Role-based access control
* Roles:

  * Tenant
  * Landlord
  * Admin

---

## 🏡 Property Management

### Landlord

* Create property listings
* Upload property images
* Update property details
* Delete property listings
* View interested tenants
* View contact requests

### Tenant

* Browse available properties
* Search properties
* Filter properties by:

  * Location
  * Price
  * Bachelor allowed
* Save properties
* Express interest in properties
* Send contact requests to landlords

---

# 🧰 Tech Stack

## Frontend

* React
* Tailwind CSS
* Axios
* React Router

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer (file upload)
* Cloudinary (image hosting)

---

# 📂 Project Structure

```
bachelor-rental-platform
│
├── backend
│   ├── controllers
│   │   ├── userController.js
│   │   └── propertyController.js
│   │
│   ├── middleware
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models
│   │   ├── User.js
│   │   └── Property.js
│   │
│   ├── routes
│   │   ├── userRoutes.js
│   │   └── propertyRoutes.js
│   │
│   ├── utils
│   │   ├── cloudinary.js
│   │   └── upload.js
│   │
│   ├── server.js
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── api
│   │   │   └── axios.js
│   │   ├── components
│   │   │   └── PropertyCard.jsx
│   │   ├── pages
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md
```

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```
git clone https://github.com/yourusername/bachelor-rental-platform.git
```

---

## 2️⃣ Backend Setup

```
cd backend
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_key
CLOUDINARY_SECRET=your_secret
```

Run backend:

```
npm run dev
```

---

## 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

# 🔗 API Endpoints

## Authentication

```
POST /api/users/register
POST /api/users/login
GET  /api/users/profile
```

---

## Properties

```
GET    /api/properties
GET    /api/properties/:id
POST   /api/properties
PUT    /api/properties/:id
DELETE /api/properties/:id
```

---

## Tenant Features

```
POST   /api/properties/:id/save
DELETE /api/properties/:id/save
POST   /api/properties/:id/interest
POST   /api/properties/:id/contact
```

---

## Landlord Features

```
GET /api/properties/my-properties
GET /api/users/contact-requests
```

---

# 📸 Screenshots

Add screenshots here once UI is complete.

Example:

```
Home Page
Property Listing
Property Details
Landlord Dashboard
```

---

# 🎯 Future Improvements

* Property map view
* Advanced filters
* Chat between tenant and landlord
* Notifications system
* Admin moderation panel
* Deployment on AWS / Vercel

---

# 👨‍💻 Author

**Jenish Jani**

AI/ML Engineering Student
Building practical web applications for real-world problems.

---

# ⭐ Support

If you like this project, give it a **star on GitHub** ⭐
