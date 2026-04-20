import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; 
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ServiceList from "./pages/ServiceList";
import BookingFlow from "./pages/BookingFlow";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Auth from "./pages/Auth";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminRoute from "./components/common/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/services/:category" element={<ServiceList />} />
              <Route path="/book/:id" element={<ProtectedRoute><BookingFlow /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;