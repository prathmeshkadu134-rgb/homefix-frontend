import React from 'react';
import './footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-grid">
      <div className="footer-info">
        <h3>HomeFix</h3>
        <p>Premium on-demand household services. Trusted by 50,000+ Indian homes.</p>
      </div>
      <div className="footer-links">
        <h4>Services</h4>
        <p>Plumbing</p><p>Electrical</p><p>Cleaning</p>
      </div>
      <div className="footer-contact">
        <h4>Contact Us</h4>
        <p>+91 98765 43210</p>
        <p>Mumbai, Maharashtra</p>
      </div>
    </div>
    <div className="footer-bottom">© 2026 HomeFix Pvt. Ltd.</div>
  </footer>
);
export default Footer;