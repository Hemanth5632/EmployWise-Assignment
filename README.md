
# 🚀 **EmployWise - User Management System**

---

### 🛠️ **Project Description**
EmployWise is a React-based user management application that allows you to:
- View a paginated list of users fetched from the Reqres API.
- Search for users by name or email.
- Edit and delete user information.
- Implement secure authentication with token-based routing.
- Display error messages and provide notifications using `react-toastify`.
- Implement proper error handling with `ErrorBoundary`.

---

### ⚙️ **Tech Stack**
- **Frontend:** React.js, React Router, Bootstrap, Axios
- **Styling:** Bootstrap, CSS
- **State Management:** React Hooks (`useState`, `useEffect`)
- **API:** [Reqres API](https://reqres.in)
- **Notifications:** `react-toastify`
- **Error Handling:** Custom `ErrorBoundary` component

---

### 🚀 **Installation and Setup Instructions**

1. **Clone the Repository:**
```bash
git clone <repository-url>
cd employwise-assignment
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Create a `.env` File:**
Add the following in the root directory:
```
SKIP_PREFLIGHT_CHECK=true
```

4. **Start the Development Server:**
```bash
npm start
```
The app will be accessible at:
```
http://localhost:3000
```

---

### 🔥 **Available Scripts**

- `npm start`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm test`: Launches the test runner.
- `npm run eject`: Ejects the project for advanced configuration.

---

### 📂 **Project Structure**
```
/src
 ├── /components
 │       ├── Login.js          // Login page
 │       ├── UserList.js       // User listing and management
 │       ├── EditUser.js       // User edit form
 │       ├── Pagination.js     // Pagination component
 │       └── ErrorBoundary.js  // Error boundary handling
 │
 ├── /services
 │       └── api.js            // Axios API configuration
 │
 ├── /styles.css               // Global styles
 ├── App.js                    // Main app component
 ├── index.js                   // React DOM render entry point
 ├── README.md                  // Project instructions
 ├── package.json               // Dependencies and scripts
 ├── .env                       // Environment variables
```

---

### 🚦 **Features and Functionality**

✅ **Authentication:**
- Secure login using token-based authentication.
- Automatic redirection based on authentication status.

✅ **User Management:**
- Fetch users from the Reqres API.
- Search by name or email.
- Pagination support.

✅ **CRUD Operations:**
- Edit and delete users.
- Confirm dialog on deletion.
- Display success/error messages using `react-toastify`.

✅ **Error Handling:**
- `ErrorBoundary` component to catch and display unexpected errors.
- Graceful error messages for failed API calls.

✅ **UI Enhancements:**
- Loading spinner using `react-spinners`.
- Styled with Bootstrap for a responsive and consistent UI.

---

### 🛠️ **API Endpoints Used**
The application uses the following Reqres API endpoints:
- `GET /users?page={page}` → Fetch paginated user list
- `GET /users/{id}` → Fetch single user details
- `PUT /users/{id}` → Update user details
- `DELETE /users/{id}` → Delete user

---

### ⚠️ **Troubleshooting**

If you encounter errors during installation or running the app:
1. **Clear Cache and Reinstall:**
```bash
rm -rf node_modules package-lock.json
npm install
```

2. **Force Install:**
```bash
npm install --force
```

---

### 🚀 **Deployment Instructions**

To deploy your project:
1. Build the production-ready version:
```bash
npm run build
```
2. Deploy the `/build` folder to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages

---

### 🙌 **Contributing**
Contributions are welcome! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description.

---

### 📄 **License**
This project is licensed under the MIT License.

---

### 👨‍💻 **Author**
**Hemanth Chikoti**

---

### ✅ **Screenshots**
📌 *Add screenshots here to visually demonstrate the features.*

---
