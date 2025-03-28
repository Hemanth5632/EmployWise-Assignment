import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ClipLoader from "react-spinners/ClipLoader";

import Login from './components/Login';
import UserList from './components/UserList';
import EditUser from './components/EditUser';
import ErrorBoundary from './components/ErrorBoundary';  // ✅ Import ErrorBoundary
import './styles.css';

const App = () => {
  const token = localStorage.getItem('token');  // Check for token

  return (
    <>
      {/* Toast Notifications */}
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Router>
        <Suspense fallback={
          <div className="spinner-container">
            <ClipLoader color="#007bff" size={50} />
          </div>
        }>
          <ErrorBoundary>  {/* ✅ Wrap everything with ErrorBoundary */}
            <Routes>
              {/* Login Route */}
              <Route path="/" element={<Login />} />

              {/* Protected Routes */}
              <Route 
                path="/users" 
                element={token ? <UserList /> : <Navigate to="/" />} 
              />
              <Route 
                path="/edit/:id" 
                element={token ? <EditUser /> : <Navigate to="/" />} 
              />

              {/* Redirect to Login if Route not found */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </ErrorBoundary>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
