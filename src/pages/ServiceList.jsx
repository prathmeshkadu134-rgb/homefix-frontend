import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './serviceList.css';

const ServiceList = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const pros = [
  { 
    id: 1, name: "Marcus Rivera", service: "Plumbing", rate: 499, rating: 4.8, exp: "8 Years", 
    img: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 2, name: "Elena Martinez", service: "Cleaning", rate: 399, rating: 4.9, exp: "5 Years", 
    img: 'https://img.freepik.com/free-photo/young-determined-armenian-curlyhaired-female-university-student-listen-carefully-asignment-look-confident-ready-task-cross-hands-chest-smiling-selfassured-standing-white-background_176420-56066.jpg?semt=ais_hybrid&w=740&q=80' 
  },
  { 
    id: 3, name: "David Chen", service: "Electrician", rate: 450, rating: 4.7, exp: "10 Years", 
    img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 4, name: "Sarah Jenkins", service: "AC Repair", rate: 699, rating: 4.8, exp: "6 Years", 
    img: 'https://images.unsplash.com/photo-1614283233556-f35b0c801ef1?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 5, name: "James Okafor", service: "Plumbing", rate: 420, rating: 4.6, exp: "12 Years", 
    img: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 6, name: "Chloe Bennett", service: "Cleaning", rate: 349, rating: 4.7, exp: "4 Years", 
    img: 'https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 7, name: "Thomas Miller", service: "Electrician", rate: 550, rating: 4.9, exp: "15 Years", 
    img: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=800&auto=format&fit=crop' 
  },
  { 
    id: 8, name: "Isabella Rossi", service: "AC Repair", rate: 750, rating: 5.0, exp: "7 Years", 
    img: 'https://femalefoundersfund.com/wp-content/uploads/2020/05/Headshots-132-2.jpg' 
  }
];  

const { setPendingBooking } = useAuth();

const handleSelectPro = (pro) => {
  setPendingBooking({
    name: pro.name,
    img: pro.img,
    rate: pro.rate,
    service: pro.service
  });
  navigate(`/book/${pro.id}`);
};

  return (
    <div className="service-list">
      <div className="list-header">
        <h1>{category} Professionals</h1>
        <p>{pros.length} verified experts found in your area</p>
      </div>
      <div className="pro-grid">
        {pros.map(pro => (
          <div key={pro.id} className="pro-card">
            <img 
  src={pro.img} 
  alt={pro.name} 
  className="pro-thumb" 
  referrerPolicy="no-referrer" 
  loading="lazy"
/>
            <div className="pro-info">
              <div className="pro-top">
                <h3>{pro.name}</h3>
                <span className="rating"><FiStar fill="rgb(217, 119, 87)" /> {pro.rating}</span>
              </div>
              <p className="pro-meta">{pro.service} Specialist • 6 Years Exp</p>
              <div className="pro-bottom">
                <span className="price">₹{pro.rate}<span>/hr</span></span>
                <button className="btn-book" onClick={() => handleSelectPro(pro)}>Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ServiceList;