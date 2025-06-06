import React from 'react';
import './SupportTickets.scss';

const SupportTickets = () => {
    return (
        <div className="support-tickets-content">
            <h3>Support Tickets</h3>
            <div className="tickets-header">
                <button className="new-ticket-btn">Create New Ticket</button>
            </div>
            <div className="tickets-table">
                <table>
                    <thead>
                        <tr>
                            <th>Ticket ID</th>
                            <th>Subject</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan="6">No support tickets found.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SupportTickets;