import React, { useState, useEffect } from 'react';
import './styles/AdminEventPage.css';

const AdminEventPage = () => {
    const API_URL = process.env.REACT_APP_API_URL;
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({
        name: '', description: '', location: '', startDate: '',
        startTime: '', endDate: '', endTime: '', organizer: '', eventType: '', registrationUrl: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        handleSearchEvents();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Add Event Response:', data);
            resetForm();
            handleSearchEvents();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    const handleEditEvent = async () => {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Update Event Response:', data);
            resetForm();
            setIsModalOpen(false);
            handleSearchEvents();
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleRemoveEvent = async (eventId) => {
        try {
            const response = await fetch(`${API_URL}/events`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ eventId })
            });
            const data = await response.json();
            console.log('Remove Event Response:', data);
            handleSearchEvents();
        } catch (error) {
            console.error('Error removing event:', error);
        }
    };

    const handleSearchEvents = async () => {
        try {
            const response = await fetch(`${API_URL}/events?search=${searchQuery}`);
            const data = await response.json();
            setEvents(data.data || []);
        } catch (error) {
            console.error('Error searching events:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', description: '', location: '', startDate: '',
            startTime: '', endDate: '', endTime: '', organizer: '', eventType: '', registrationUrl: ''
        });
        setIsEditing(false);
    };

    const openEditModal = (event) => {
        setFormData(event);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    return (
        <div className="admin-container">
            <h2>Event Management</h2>

            {/* Add Event Form */}
            <div className="event-form">
                <h3>{isEditing ? 'Edit Event' : 'Add Event'}</h3>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                <input type="text" name="organizer" placeholder="Organizer" value={formData.organizer} onChange={handleChange} />
                <input type="text" name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} />
                <input type="text" name="registrationUrl" placeholder="Registration URL" value={formData.registrationUrl} onChange={handleChange} />
                <button onClick={isEditing ? handleEditEvent : handleAddEvent}>
                    {isEditing ? 'Update Event' : 'Add Event'}
                </button>
                {isEditing && <button onClick={closeModal}>Cancel</button>}
            </div>

            {/* Search Bar */}
            <div className="event-search">
                <h3>Search Events</h3>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearchEvents}>Search</button>
            </div>

            {/* Event List */}
            <ul className="event-list">
                {events.map(event => (
                    <li key={event.eventId} className="event-card">
                        <h4>{event.name}</h4>
                        <p>{event.description}</p>
                        <p>{event.location}</p>
                        <p>{event.startDate} {event.startTime} - {event.endDate} {event.endTime}</p>
                        <p>Organizer: {event.organizer}</p>
                        <p>Type: {event.eventType}</p>
                        <p>Registration: <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">{event.registrationUrl}</a></p>
                        <button onClick={() => openEditModal(event)}>Edit</button>
                        <button onClick={() => handleRemoveEvent(event.eventId)}>Remove</button>
                    </li>
                ))}
            </ul>

            {/* Edit Event Modal */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Edit Event</h3>
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />
                        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} />
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} />
                        <input type="text" name="organizer" placeholder="Organizer" value={formData.organizer} onChange={handleChange} />
                        <input type="text" name="eventType" placeholder="Event Type" value={formData.eventType} onChange={handleChange} />
                        <input type="text" name="registrationUrl" placeholder="Registration URL" value={formData.registrationUrl} onChange={handleChange} />
                        <button onClick={handleEditEvent}>Update Event</button>
                        <button onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminEventPage;