// components/ExpenseTotal.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Card } from 'react-bootstrap';

const ExpenseTotal = () => {
    const { expenses, currency } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);

    return (
        <Card className='p-3'>
            <h4>Spent: {currency}{totalExpenses.toLocaleString()}</h4>
        </Card>
    );
};

export default ExpenseTotal;
