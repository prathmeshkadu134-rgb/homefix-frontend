import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosConfig'; 
import toast from 'react-hot-toast';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [dbBookings, setDbBookings] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchMyBookings();
    }
  }, [user]);

  const fetchMyBookings = async () => {
    try {
      const response = await api.get(`/bookings/user/${user.id}`);
      setDbBookings(response.data);
    } catch (error) {
      toast.error("Failed to load your bookings.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      await api.delete(`/bookings/${bookingId}`); 
      setDbBookings(dbBookings.filter(b => b.id !== bookingId)); 
      toast.success("Booking cancelled successfully.");
    } catch (error) {
      toast.error("Could not cancel booking.");
    }
  };

  if (isLoading) return <div className="loading-screen">Loading your dashboard...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}</h1>
        <p>Manage your upcoming services here.</p>
      </div>

      <div className="dashboard-layout">
        <div className="bookings-list">
          <h2>Upcoming Bookings</h2>
          
          {dbBookings.length === 0 ? (
            <p className="empty-state">You have no active bookings right now.</p>
          ) : (
            dbBookings.map((booking) => (
              <div key={booking.id} className="booking-status-card">
                <div className="pro-thumb-box">
                  <img src={booking.professionalImageUrl} alt={booking.professionalName} referrerPolicy="no-referrer"/>
                </div>
                
                <div className="booking-details">
                  <div className="info-top">
                    <h3>{booking.serviceType}</h3>
                    <span className="status-badge">{booking.status}</span>
                  </div>
                  <p className="pro-name">Professional: {booking.professionalName}</p>
                  <div className="schedule-meta">
                    <span>📅 {booking.bookingDate}</span>
                    <span>⏰ {booking.bookingTime}</span>
                    <span>💵 ₹{booking.price}</span>
                  </div>
                </div>

                <div className="booking-actions">
                  <button 
                    className="btn-cancel" 
                    onClick={() => handleCancel(booking.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;