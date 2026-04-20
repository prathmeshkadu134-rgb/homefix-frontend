import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('homefix_user');
    return savedUser ? JSON.parse(savedUser) : { id: null, name: "", email: "", isLoggedIn: false };
  });

  const [myBookings, setMyBookings] = useState([]);
  const [pendingBooking, setPendingBooking] = useState(null);

  const login = (authData) => {
    const loggedInUser = { ...authData.user, isLoggedIn: true };
    
    setUser(loggedInUser);
    localStorage.setItem('homefix_user', JSON.stringify(loggedInUser)); 
    localStorage.setItem('homefix_token', authData.token); 
  };

  const logout = () => {
    setUser({ id: null, name: "", email: "", isLoggedIn: false });
    localStorage.removeItem('homefix_user');
    localStorage.removeItem('homefix_token'); 
    setMyBookings([]); 
  };

  const addBooking = (bookingData) => {
    setMyBookings([...myBookings, { ...bookingData, id: Date.now(), status: "CONFIRMED" }]);
    setPendingBooking(null); 
  };

  const cancelBooking = (id) => {
    setMyBookings(myBookings.filter(b => b.id !== id));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      myBookings, 
      pendingBooking, 
      setPendingBooking, 
      addBooking, 
      cancelBooking 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);