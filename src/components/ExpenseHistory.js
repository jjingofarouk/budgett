// components/ExpenseHistory.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Table, Button, Form, Dropdown } from 'react-bootstrap';
import { FaHistory, FaFilter, FaDownload } from 'react-icons/fa';

const ExpenseHistory = () => {
    const { history, currency } = useContext(AppContext);
    const [filter, setFilter] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [filterCategory, setFilterCategory] = useState('');

    const categories = ['Capital', 'Operational', 'Strategic', 'Emergency'];

    const filteredHistory = history
        .filter(entry => entry.name.toLowerCase().includes(filter.toLowerCase()))
        .filter(entry => filterCategory ? entry.category === filterCategory : true)
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'amount') {
                return Math.abs(b.cost) - Math.abs(a.cost);
            } else {
                return a.name.localeCompare(b.name);
            }
        });

    const clearHistory = () => {
        localStorage.removeItem('expenseHistory');
        window.location.reload();
    };

    const exportHistory = () => {
        const csvContent = [
            ['Sector', 'Amount', 'Category', 'Date'],
            ...filteredHistory.map(entry => [
                entry.name,
                `${entry.cost > 0 ? '+' : ''}${currency}${entry.cost.toLocaleString()}`,
                entry.category || 'N/A',
                new Date(entry.date).toLocaleString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'vaultvision_history.csv';
        link.click();
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <Form.Group className="w-25">
                    <Form.Label><FaFilter className="me-2" /> Filter by Sector</Form.Label>
                    <Form.Control
                        type="text"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        placeholder="Search sector..."
                    />
                </Form.Group>
                <Form.Group className="w-25">
                    <Form.Label>Filter by Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="w-25">
                    <Form.Label>Sort By</Form.Label>
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-primary" id="sort-dropdown">
                            {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setSortBy('date')}>Date</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortBy('amount')}>Amount</Dropdown.Item>
                            <Dropdown.Item onClick={() => setSortBy('name')}>Sector</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredHistory.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{entry.cost > 0 ? '+' : ''}{currency}{entry.cost.toLocaleString()}</td>
                            <td>{entry.category || 'N/A'}</td>
                            <td>{new Date(entry.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {history.length > 0 && (
                <div className="d-flex gap-2">
                    <Button variant="danger" onClick={clearHistory}>
                        <FaHistory className="me-2" /> Clear Ledger
                    </Button>
                    <Button variant="outline-secondary" onClick={exportHistory}>
                        <FaDownload className="me-2" /> Export
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ExpenseHistory;