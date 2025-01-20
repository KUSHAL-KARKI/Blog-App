# Blog App

This is a blog application built using the **MERN stack** (MongoDB, Express, React, Node.js) with **Redux** for state management. It includes features like CRUD operations (Create, Read, Update, Delete) and user authentication.

## Features

- **User Authentication**: Sign up, login, and secure access using JWT.
- **CRUD Operations**: Create, read, update, and delete blog posts.
- **State Management**: Managed using Redux for seamless data handling.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React, Redux, CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- MongoDB
- npm or yarn

### Steps to Run Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/KUSHAL-KARKI/Blog-App
   cd Blog-App
   ```

2. **Install Dependencies**

   - Install server-side dependencies:
     ```bash
     cd backend
     npm install
     ```

   - Install client-side dependencies:
     ```bash
     cd ../frontend
     npm install
     ```

3. **Environment Variables**

   Create a `.env` file in the `backend` directory and add the following:
   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Run the Application**

   - Start the server:
     ```bash
     cd backend
     npm run dev
     ```

   - Start the client:
     ```bash
     cd ../frontend
     npm npm run dev
     ```

5. **Open in Browser**

   Navigate to `http://localhost:3000` to view the application.

## Folder Structure

### Backend
```
backend
│
├── controllers
│   ├── blogController.js
│   └── userController.js
│
├── middleware
│   └── userMiddleware.js
│
├── models
│   ├── blogModel.js
│   └── userModel.js
│
├── routes
│   └── blogRoute.js
│
└── index.js
```

### Frontend
```
frontend
│
└── src
    ├── components
    │   ├── Navbar.jsx
    │   └── Signup.jsx
    │
    ├── hooks
    │   ├── useBlogDetail.js
    │   ├── useCreateBlog.js
    │   ├── useLogin.js
    │   ├── useLogout.js
    │   ├── useSignup.js
    │   └── useUpdateBlog.js
    │
    ├── pages
    │   ├── BlogDetailPage.jsx
    │   ├── BlogUpdatePage.jsx
    │   ├── Create.jsx
    │   └── Home.jsx
    │
    ├── redux
    │   ├── authSlice.js
    │   └── store.js
    │
    ├── App.jsx
    ├── index.css
    ├── index.html
    ├── main.jsx
    └── vite.config.js
```

## Contributing

Feel free to submit issues or pull requests for any improvements.

## License

This project is licensed under the MIT License.

---
