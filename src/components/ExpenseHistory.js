// components/ExpenseHistory.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Table, Button } from 'react-bootstrap';

const ExpenseHistory = () => {
    const { expenses, currency } = useContext(AppContext);
    const [history] = useState(() => {
        const savedHistory = localStorage.getItem('expenseHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    });

    React.useEffect(() => {
        localStorage.setItem('expenseHistory', JSON.stringify(history));
    }, [history]);

    const clearHistory = () => {
        localStorage.removeItem('expenseHistory');
        window.location.reload();
    };

    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Department</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {history.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.name}</td>
                            <td>{currency}{entry.cost.toLocaleString()}</td>
                            <td>{new Date(entry.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {history.length > 0 && (
                <Button variant="danger" onClick={clearHistory}>
                    Clear History
                </Button>
            )}
        </div>
    );
};

export default ExpenseHistory;