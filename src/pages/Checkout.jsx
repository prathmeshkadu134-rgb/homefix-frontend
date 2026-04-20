import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiShield, FiCreditCard } from 'react-icons/fi';
import api from '../api/axiosConfig';
import toast from 'react-hot-toast';
import './checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user, pendingBooking, setPendingBooking } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!pendingBooking) {
      toast.error("No active booking found!");
      return;
    }

    setIsProcessing(true);

    try {
      const res = await loadRazorpayScript();
      if (!res) {
        toast.error('Razorpay SDK failed to load. Are you online?');
        setIsProcessing(false);
        return;
      }

      const orderResponse = await api.post('/payment/create-order', {
        amount: pendingBooking.rate 
      });

      const options = {
        key: "rzp_test_SdipRsIjXTqMAw", 
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "HomeFix Services",
        description: `Booking for ${pendingBooking.service}`,
        image: "https://cdn-icons-png.flaticon.com/512/10000/10000305.png", 
        order_id: orderResponse.data.id,
        
        handler: async function (response) {
          try {
            const finalBooking = {
              professionalName: pendingBooking.name,
              serviceType: pendingBooking.service,
              bookingDate: "20th April, 2026", 
              bookingTime: "10:30 AM",
              price: pendingBooking.rate,
              status: "CONFIRMED",
              professionalImageUrl: pendingBooking.img
            };

            await api.post(`/bookings/user/${user.id}`, finalBooking);

            setPendingBooking(null);
            toast.success(`Payment of ₹${pendingBooking.rate} Successful!`, { duration: 5000 });
            navigate('/dashboard');

          } catch (error) {
            toast.error("Payment received, but failed to save booking.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email || "customer@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#14532D" 
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      toast.error("Server error. Could not initiate payment.");
    } finally {
      setIsProcessing(false); 
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-layout">
        <div className="payment-section">
          <h2>Complete Your Booking</h2>
          <div className="payment-card-box">
             <div className="razorpay-banner">
                <FiShield size={30} color="#14532D" />
                <div>
                   <h3>Secured by Razorpay</h3>
                   <p>100% Safe & Secure Payments</p>
                </div>
             </div>
             <button 
               className="btn-pay-massive" 
               onClick={handlePayment} 
               disabled={isProcessing}
             >
                {isProcessing ? 'Connecting securely...' : `Pay ₹${pendingBooking?.rate || 0} Now`}
             </button>
          </div>
        </div>

        <div className="summary-sidebar">
          <div className="summary-box">
            <h3>Booking Summary</h3>
            <div className="summary-item">
              <span>Service</span>
              <span>{pendingBooking?.service}</span>
            </div>
            <div className="summary-item">
              <span>Professional</span>
              <span>{pendingBooking?.name}</span>
            </div>
            <hr />
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{pendingBooking?.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;