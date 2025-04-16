import { Navigate } from 'react-router-dom';

const verifyToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token));
    console.log('Verifying token:', {
      decodedUsername: decoded.username,
      envUsername: process.env.REACT_APP_ADMIN_USERNAME
    });
    return decoded.username === process.env.REACT_APP_ADMIN_USERNAME;
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const isAuthenticated = token && verifyToken(token);
  
  if (!isAuthenticated) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;