import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './bookingFlow.css';

const BookingFlow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  const slots = ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  return (
    <div className="booking-page">
      <div className="booking-card">
        <h1>Schedule Service</h1>
        <p>Choose a convenient time slot for your visit.</p>
        
        <div className="slot-section">
          <h3>Available Slots</h3>
          <div className="slot-grid">
            {slots.map(slot => (
              <button 
                key={slot} 
                className={`time-btn ${selectedSlot === slot ? 'active' : ''}`}
                onClick={() => setSelectedSlot(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="address-section">
          <h3>Service Address</h3>
          <input type="text" placeholder="House No / Street Name" className="book-input" />
          <input type="text" placeholder="Landmark (Optional)" className="book-input" />
        </div>

        <button 
  className="btn-confirm" 
  disabled={!selectedSlot} 
  onClick={() => navigate('/checkout')}
>
  Proceed to Pay
</button>
      </div>
    </div>
  );
};
export default BookingFlow;