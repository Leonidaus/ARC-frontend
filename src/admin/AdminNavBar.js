import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBar = () => {
    return (
        <nav className="admin-navbar">
            <ul>
                <li><Link to="/admin">Dashboard</Link></li>
                <li><Link to="/admin/events">Event Tools</Link></li>
                <li><Link to="/admin/board">Board Tools</Link></li>
                <li><Link to="/admin/sponsors">Sponsor Tools</Link></li>
            </ul>
        </nav>
    );
};

export default AdminNavBar;