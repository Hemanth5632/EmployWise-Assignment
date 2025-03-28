import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import API from '../services/api';
import '../styles.css';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔥 Fetch User Data by ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        const { first_name, last_name, email } = res.data.data;
        setUser({ first_name, last_name, email });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user', error);
        setError('Failed to load user data.');
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  // 🔥 Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // 🔥 Form Submission with Validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.first_name || !user.last_name || !user.email) {
      toast.error('All fields are required!');
      return;
    }

    try {
      await API.put(`/users/${id}`, user);

      // ✅ Refresh Local Storage or State
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      const updatedUsers = storedUsers.map(u =>
        u.id === parseInt(id) ? { ...u, ...user } : u
      );

      localStorage.setItem('users', JSON.stringify(updatedUsers));

      toast.success('User updated successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Failed to update user', error);
      toast.error('Failed to update user!');
    }
  };

  // 🔥 Handle Cancel
  const handleCancel = () => {
    navigate('/users');
  };

  return (
    <div className="container mt-5">
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : (
        <div className="card p-4 shadow-sm">
          <h2 className="text-center">Edit User</h2>

          {error && <p className="text-danger text-center">{error}</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                value={user.first_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                value={user.last_name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={user.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary w-45">Update</button>
              <button 
                type="button" 
                className="btn btn-secondary w-45" 
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUser;
