// components/ExpenseList.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';
import { Table, Form } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);
    const [filterCategory, setFilterCategory] = useState('');

    const categories = ['Capital', 'Operational', 'Strategic', 'Emergency'];
    const filteredExpenses = filterCategory
        ? expenses.filter(expense => expense.category === filterCategory)
        : expenses;

    return (
        <div>
            <Form.Group className="mb-3 w-25">
                <Form.Label><FaFilter className="me-2" /> Filter by Category</Form.Label>
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Sector</th>
                        <th>Investment</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredExpenses.map((expense) => (
                        <ExpenseItem
                            key={expense.id}
                            id={expense.id}
                            name={expense.name}
                            cost={expense.cost}
                            category={expense.category}
                        />
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ExpenseList;