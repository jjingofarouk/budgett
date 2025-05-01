// components/Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, Form, Button } from 'react-bootstrap';

const Budget = () => {
    const { budget, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);

    const handleBudgetChange = (event) => {
        const value = parseInt(event.target.value);
        if (value >= 0) {
            setNewBudget(value);
        }
    };

    const submitBudget = () => {
        dispatch({
            type: 'SET_BUDGET',
            payload: newBudget
        });
    };

    return (
        <Card className='p-3'>
            <h4>Budget: {currency}{budget.toLocaleString()}</h4>
            <Form.Group>
                <Form.Control
                    type="number"
                    value={newBudget}
                    onChange={handleBudgetChange}
                    className="mt-2"
                />
                <Button
                    variant="primary"
                    onClick={submitBudget}
                    className="mt-2"
                >
                    Update Budget
                </Button>
            </Form.Group>
        </Card>
    );
};

export default Budget;
