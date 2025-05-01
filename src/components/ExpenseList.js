// components/ExpenseList.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';
import { Table, Badge } from 'react-bootstrap';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Sector</th>
                    <th>Investment</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <ExpenseItem
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        cost={expense.cost}
                    />
                ))}
            </tbody>
        </Table>
    );
};

export default ExpenseList;