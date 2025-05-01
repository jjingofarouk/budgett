// components/ExpenseTotal.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, Badge } from 'react-bootstrap';
import { FaMoneyCheckAlt } from 'react-icons/fa';

const ExpenseTotal = () => {
    const { expenses, currency, budget } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0);
    const percentage = ((totalExpenses / budget) * 100).toFixed(1);

    return (
        <Card className='p-4'>
            <h4><FaMoneyCheckAlt className="me-2" /> Deployed Capital: {currency}{totalExpenses.toLocaleString()}</h4>
            <Badge bg={percentage > 80 ? 'warning' : 'info'} className="mt-2">
                {percentage}% of Budget
            </Badge>
        </Card>
    );
};

export default ExpenseTotal;