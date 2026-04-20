import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import { FiUsers, FiBriefcase } from 'react-icons/fi';
import './adminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const [usersRes, bookingsRes] = await Promise.all([
        api.get('/users'),
        api.get('/bookings')
      ]);
      setUsers(usersRes.data);
      setBookings(bookingsRes.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Admin Command Center</h1>
        <p>Monitor platform activity and users.</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <FiUsers className="admin-icon" />
          <div>
            <h3>Total Users</h3>
            <p className="stat-number">{users.length}</p>
          </div>
        </div>
        <div className="admin-stat-card">
          <FiBriefcase className="admin-icon" />
          <div>
            <h3>Total Bookings</h3>
            <p className="stat-number">{bookings.length}</p>
          </div>
        </div>
      </div>

      <div className="admin-tables-section">
        <div className="admin-table-wrapper">
          <h2>Recent Bookings</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Professional</th>
                <th>Service</th>
                <th>Date & Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>#{b.id}</td>
                  <td>{b.user?.name || 'Unknown'}</td>
                  <td>{b.professionalName}</td>
                  <td>{b.serviceType}</td>
                  <td>{b.bookingDate} at {b.bookingTime}</td>
                  <td><span className={`status-badge ${b.status.toLowerCase()}`}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;