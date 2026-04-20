import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiTool, FiHome, FiSettings, FiCalendar, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext'; 
import toast from 'react-hot-toast'; 
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const { user, logout } = useAuth(); 

  const isActive = (path) => location.pathname === path ? 'active' : '';
  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleLogout = () => {
    logout();
    closeMenu();
    toast.success("Successfully logged out. See you next time!");
    navigate('/login');
  };

  return (
    <nav className="navbar-container-fix">
      <div className="nav-logo-box" onClick={() => { navigate('/'); closeMenu(); }}>
        <div className="logo-icon-square"><FiTool /></div>
        <span className="logo-text">HomeFix</span>
      </div>

      <div className="nav-links-pill desktop-only">
        <Link to="/" className={`nav-link-item ${isActive('/')}`}><FiHome /> Home</Link>
        <Link to="/services/all" className={`nav-link-item ${isActive('/services/all')}`}><FiSettings /> Services</Link>
        <Link to="/dashboard" className={`nav-link-item ${isActive('/dashboard')}`}><FiCalendar /> Bookings</Link>
        {user.role === 'ADMIN' && (
          <Link to="/admin" className={`nav-link-item ${isActive('/admin')}`}>Admin Panel</Link>
        )}
      </div>

      <div className="nav-actions">
        {user.isLoggedIn ? (
          <div className="nav-user-group desktop-only">
            <div 
              className="nav-profile-circle" 
              onClick={() => navigate('/dashboard')}
              title="Go to Dashboard"
            >
              <span className="profile-initial">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </span>
            </div>
            <button className="btn-logout" onClick={handleLogout} title="Logout">
              <FiLogOut size={20} />
            </button>
          </div>
        ) : (
          <button className="btn-main desktop-only" onClick={() => navigate('/login')}>
            Login
          </button>
        )}
        
        <button 
          className="mobile-toggle-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX size={28} color="rgb(20, 83, 45)" /> : <FiMenu size={28} color="rgb(20, 83, 45)" />}
        </button>
      </div>

      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <Link to="/" className={`mobile-link ${isActive('/')}`} onClick={closeMenu}><FiHome /> Home</Link>
        <Link to="/services/all" className={`mobile-link ${isActive('/services/all')}`} onClick={closeMenu}><FiSettings /> Services</Link>
        <Link to="/dashboard" className={`mobile-link ${isActive('/dashboard')}`} onClick={closeMenu}><FiCalendar /> My Bookings</Link>
        {user.role === 'ADMIN' && (
  <Link to="/admin" className={`nav-link-item ${isActive('/admin')}`}>Admin Panel</Link>
)}
        {!user.isLoggedIn ? (
          <Link to="/login" className="mobile-link" onClick={closeMenu}>
            <FiUser /> Login
          </Link>
        ) : (
          <button className="mobile-link mobile-logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;