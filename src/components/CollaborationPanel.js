// components/CollaborationPanel.js
import React, { useState, useEffect } from 'react';
import { Card, Form, Button, ListGroup, InputGroup, Badge } from 'react-bootstrap';
import { FaUsers, FaPaperPlane, FaBell } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

const CollaborationPanel = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState('Finance Lead');
    const [notifications, setNotifications] = useState(0);

    const users = ['Finance Lead', 'CEO', 'CTO', 'Marketing Director', 'Operations Manager'];

    useEffect(() => {
        const storedMessages = localStorage.getItem('collaborationMessages');
        if (storedMessages) {
            setMessages(JSON.parse(storedMessages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('collaborationMessages', JSON.stringify(messages));
        setNotifications(messages.length);
    }, [messages]);

    const sendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: uuidv4(),
                user,
                text: newMessage,
                timestamp: new Date()
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    const clearNotifications = () => {
        setNotifications(0);
    };

    return (
        <div className="collab-container">
            <Card>
                <Card.Header className="d-flex justify-content-between align-items-center">
                    <span><FaUsers className="me-2" /> Team Collaboration</span>
                    <Badge bg="info" onClick={clearNotifications} style={{ cursor: 'pointer' }}>
                        <FaBell className="me-1" /> {notifications}
                    </Badge>
                </Card.Header>
                <Card.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        >
                            {users.map((u) => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <ListGroup className="mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {messages.map((msg) => (
                            <ListGroup.Item key={msg.id}>
                                <strong>{msg.user}</strong> ({new Date(msg.timestamp).toLocaleTimeString()}): {msg.text}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button variant="primary" onClick={sendMessage}>
                            <FaPaperPlane />
                        </Button>
                    </InputGroup>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CollaborationPanel;