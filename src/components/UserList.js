import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import API from '../services/api';
import Pagination from './Pagination';
import '../styles.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  // ✅ Add error state
  const navigate = useNavigate();

  // 🔥 Fetch Users with Pagination and Error Handling
  const fetchUsers = async (page) => {
    setLoading(true);
    setError(null);  // Reset error before fetching
    try {
      const res = await API.get(`/users?page=${page}`);
      if (res && res.data) {
        setUsers(res.data.data);
        setFilteredUsers(res.data.data);
        setTotalPages(res.data.total_pages);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError('Failed to load users. Please try again later.');
      toast.error('Failed to load users!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  // 🔥 Real-time Search and Filtering
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = users.filter(user =>
      `${user.first_name} ${user.last_name}`.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );

    setFilteredUsers(filtered);
  };

  // 🔥 Handle Delete with Toast and Refresh
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await API.delete(`/users/${id}`);
        fetchUsers(page);  // Refresh list after deletion
        toast.success('User deleted successfully!');
      } catch (error) {
        console.error('Failed to delete user:', error);
        toast.error('Failed to delete user!');
      }
    }
  };

  // 🔥 Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    toast.info('Logged out successfully!');
  };

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>User List</h2>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users by name or email..."
        value={search}
        onChange={handleSearch}
      />

      {/* Error Handling */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="spinner-container">
          <ClipLoader color="#007bff" size={50} />
        </div>
      ) : (
        <div className="row">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="col-md-4 mb-4">
                <div className="card shadow-sm">
                  <img src={user.avatar} alt={user.first_name} className="card-img-top" />
                  <div className="card-body">
                    <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                    <p className="card-text">{user.email}</p>
                    <div className="d-flex justify-content-between">
                      <button 
                        className="btn btn-primary"
                        onClick={() => navigate(`/edit/${user.id}`)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No users found!</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default UserList;
