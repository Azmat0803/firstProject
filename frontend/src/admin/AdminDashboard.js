import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, reviewed: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const adminUsername = localStorage.getItem('adminUsername');

  useEffect(() => {
    fetchData();
  }, [filter]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { Authorization: `Bearer ${token}` };

      // Fetch inquiries
      const queryParam = filter !== 'all' ? `?status=${filter}` : '';
      const inquiriesRes = await axios.get(
        `http://localhost:5000/api/inquiries${queryParam}`,
        { headers }
      );
      setInquiries(inquiriesRes.data.inquiries || inquiriesRes.data);

      // Fetch stats
      const statsRes = await axios.get(
        'http://localhost:5000/api/inquiries/stats/summary',
        { headers }
      );
      setStats(statsRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load data. Please try again.');
      
      if (err.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(
        `http://localhost:5000/api/inquiries/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh data
      fetchData();
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(
        `http://localhost:5000/api/inquiries/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Refresh data
      fetchData();
    } catch (err) {
      alert('Failed to delete inquiry');
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/admin/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f39c12';
      case 'reviewed': return '#3498db';
      case 'resolved': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <h1>📊 Admin Dashboard</h1>
              <p>Welcome back, <strong>{adminUsername}</strong></p>
            </div>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="container dashboard-container">
        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Inquiries</p>
            </div>
          </div>
          <div className="stat-card pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card reviewed">
            <div className="stat-icon">👁️</div>
            <div className="stat-info">
              <h3>{stats.reviewed}</h3>
              <p>Reviewed</p>
            </div>
          </div>
          <div className="stat-card resolved">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.resolved}</h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All ({stats.total})
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending ({stats.pending})
          </button>
          <button 
            className={filter === 'reviewed' ? 'active' : ''} 
            onClick={() => setFilter('reviewed')}
          >
            Reviewed ({stats.reviewed})
          </button>
          <button 
            className={filter === 'resolved' ? 'active' : ''} 
            onClick={() => setFilter('resolved')}
          >
            Resolved ({stats.resolved})
          </button>
        </div>

        {/* Inquiries Table */}
        <div className="inquiries-section">
          <h2>Inquiries</h2>
          
          {inquiries.length === 0 ? (
            <div className="no-data">
              <p>📭 No inquiries found</p>
            </div>
          ) : (
            <div className="table-container">
              <table className="inquiries-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id}>
                      <td className="date-cell">{formatDate(inquiry.createdAt)}</td>
                      <td className="name-cell">{inquiry.name}</td>
                      <td className="email-cell">
                        <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
                      </td>
                      <td className="phone-cell">{inquiry.phone || 'N/A'}</td>
                      <td className="subject-cell">{inquiry.subject}</td>
                      <td className="message-cell">
                        <div className="message-preview">{inquiry.message}</div>
                      </td>
                      <td>
                        <select
                          value={inquiry.status}
                          onChange={(e) => handleStatusChange(inquiry._id, e.target.value)}
                          className="status-select"
                          style={{ 
                            backgroundColor: getStatusColor(inquiry.status),
                            color: 'white'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          className="btn-delete"
                          title="Delete inquiry"
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;