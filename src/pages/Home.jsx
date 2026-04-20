import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiCheckCircle, FiSmartphone, FiShield, FiStar } from 'react-icons/fi';
import './home.css';

const Home = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const reviews = [
    {
      id: 1,
      name: "Alex D'souza , ",
      location: "California",
      text: "Excellent service! The plumber was very professional and solved the kitchen leakage issue in minutes. Highly recommended!",
      img: "https://cdn.pixabay.com/photo/2021/07/14/17/32/manager-6466713_1280.jpg"
    },
    {
      id: 2,
      name: "Sana Rodrige , ",
      location: "Los Angelas",
      text: "The deep cleaning team was incredibly thorough. Every corner of my house is sparkling now. Worth every rupee!",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE_i0JgKGa1Ya2a37ygX7BzbLbSkgeBri8SQ&s" 
    },
    {
      id: 3,
      name: "Joseph Wick , ",
      location: "New York",
      text: "Professional electrician. Fixed our complex wiring issue that two others couldn't figure out. Very transparent pricing.",
      img: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg"
    }
  ];

  useEffect(() => {
    const fetchDummyData = () => {
      setTimeout(() => {
        const fakeData = [
          { 
            id: 'plumbing', 
            name: 'Plumbing', 
            img: 'https://supersavvy.in/uploads/1768561400195.jpg' 
          },
          { 
            id: 'electrical', 
            name: 'Electrician', 
            img: 'https://hometriangle.com/imagecache/media/531977/image.webp' 
          },
          { 
            id: 'cleaning', 
            name: 'Cleaning', 
            img: 'https://www.urbancompany.com/img?bucket=urbanclap-prod&quality=90&format=auto/w_233,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/home-screen/1659102409372-8ca38a.png' 
          },
          { 
            id: 'ac-repair', 
            name: 'AC Repair', 
            img: 'https://www.urbancompany.com/img?bucket=urbanclap-prod&quality=90&format=auto/w_233,dpr_3,fl_progressive:steep,q_auto:low,f_auto,c_limit/images/growth/luminosity/1652168690740-f5ed68.png' 
          }
        ];
        
        setCategories(fakeData);
        setIsLoading(false); 
      }, 1500); 
    };

    fetchDummyData();
  }, []);

  return (
    <div className="home">
      
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-tag">TRUSTED HOME SERVICES</p>
          <h1>Your home deserves <br/><span>the best care</span></h1>
          <div className="hero-search">
            <FiSearch size={24} color="rgb(156, 163, 175)" />
            <input type="text" placeholder="What do you need help with?" />
            <button className="btn-search" onClick={() => navigate('/services/all')}>Search</button>
          </div>
        </div>
      </header>

      <section className="categories section-padding">
        <p className="section-tag">BROWSE BY CATEGORY</p>
        <h2>Popular Services</h2>
        
        {isLoading && <p style={{textAlign: 'center', margin: '20px 0'}}>Loading awesome services for you...</p>}
        {error && <p className="error-text">{error}</p>}

        {!isLoading && !error && (
          <div className="cat-grid">
            {categories.map(cat => (
              <div key={cat.id} className="cat-card" onClick={() => navigate(`/services/${cat.id}`)}>
                <img src={cat.img} alt={cat.name} referrerPolicy="no-referrer" />
                <div className="cat-info">
                  <h3>{cat.name}</h3>
                  <p>Starting ₹299</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="how-it-works section-padding">
        <h2 className="text-center">How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <FiSearch size={40} className="step-icon" />
            <h4>Choose a Service</h4>
            <p>Select from our wide range of household services.</p>
          </div>
          <div className="step-card">
            <FiSmartphone size={40} className="step-icon" />
            <h4>Book a Professional</h4>
            <p>Choose your preferred time slot and professional.</p>
          </div>
          <div className="step-card">
            <FiCheckCircle size={40} className="step-icon" />
            <h4>Relax & Enjoy</h4>
            <p>Our expert arrives on time to get the job done.</p>
          </div>
        </div>
      </section>

      <section className="why-us section-padding">
        <div className="why-us-content">
          <div className="why-us-text">
            <h2>Why choose HomeFix?</h2>
            <div className="feature">
              <FiShield className="feature-icon" />
              <div>
                <h5>Verified Professionals</h5>
                <p>Background checked and highly skilled experts.</p>
              </div>
            </div>
            <div className="feature">
              <FiStar className="feature-icon" />
              <div>
                <h5>Quality Assured</h5>
                <p>If you're not happy, we'll make it right.</p>
              </div>
            </div>
          </div>
          <div className="why-us-img">
            <img src="https://cdn.pixabay.com/photo/2016/11/18/17/20/living-room-1835923_1280.jpg" alt="Home" />
          </div>
        </div>
      </section>

      <section className="testimonials section-padding">
        <h2 className="text-center">What our customers say</h2>
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="stars">
                {[...Array(5)].map((_, j) => (
                  <FiStar key={j} fill="rgb(217, 119, 87)" stroke="none" />
                ))}
              </div>
              <p>"{review.text}"</p>
              <div className="customer">
                <img src={review.img} alt={review.name} />
                <div className="customer-info">
                  <span className="customer-name">{review.name}</span>
                  <span className="customer-loc">{review.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;