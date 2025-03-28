// src/services/api.js
import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: 'https://reqres.in/api',
  timeout: 5000, // Add timeout for slow connections
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const { status, data } = error.response;

      // Handle common HTTP status codes
      switch (status) {
        case 400:
          toast.error(data.error || 'Bad Request!');
          break;
        case 401:
          toast.error('Unauthorized! Please log in again.');
          break;
        case 404:
          toast.error('Resource not found.');
          break;
        case 500:
          toast.error('Server error. Please try again later.');
          break;
        default:
          toast.error('An unexpected error occurred.');
      }
    } else if (error.request) {
      toast.error('No response from server. Please check your connection.');
    } else {
      toast.error('Error: ' + error.message);
    }

    return Promise.reject(error);
  }
);

export default API;
