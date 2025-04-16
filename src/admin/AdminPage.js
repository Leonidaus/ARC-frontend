import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminNavBar from './AdminNavBar';
import AdminEventPage from './AdminEventPage';
import LoginPage from './LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

const AdminDashboard = () => (
  <div>
    <AdminNavBar />
    <div className="admin-content">
      <Routes>
        <Route path="/" element={<h1>Admin Dashboard</h1>} />
        <Route path="/events" element={<AdminEventPage />} />
      </Routes>
    </div>
  </div>
);

const AdminPage = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AdminPage;