// components/ExpenseList.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';
import { Table } from 'react-bootstrap';

const ExpenseList = () => {
    const { expenses } = useContext(AppContext);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Department</th>
                    <th>Allocated Budget</th>
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
