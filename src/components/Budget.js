// components/Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import { FaWallet } from 'react-icons/fa';

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
        <Card className='p-4'>
            <h4><FaWallet className="me-2" /> Core Capital: {currency}{budget.toLocaleString()}</h4>
            <InputGroup className="mt-3">
                <InputGroup.Text>{currency}</InputGroup.Text>
                <Form.Control
                    type="number"
                    value={newBudget}
                    onChange={handleBudgetChange}
                    placeholder="Enter new budget"
                />
                <Button
                    variant="primary"
                    onClick={submitBudget}
                >
                    Update Capital
                </Button>
            </InputGroup>
        </Card>
    );
};

export default Budget;