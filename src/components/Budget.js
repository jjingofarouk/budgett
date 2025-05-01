// components/Budget.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, Form, Button, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaWallet, FaInfoCircle } from 'react-icons/fa';

const Budget = () => {
    const { budget, currency, dispatch } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const [isEditing, setIsEditing] = useState(false);

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
        setIsEditing(false);
    };

    return (
        <Card className='p-4'>
            <div className="d-flex justify-content-between align-items-center">
                <h4><FaWallet className="me-2" /> Core Capital: {currency}{budget.toLocaleString()}</h4>
                <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Modify the core capital allocation</Tooltip>}
                >
                    <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                </OverlayTrigger>
            </div>
            {isEditing && (
                <InputGroup className="mt-3">
                    <InputGroup.Text>{currency}</InputGroup.Text>
                    <Form.Control
                        type="number"
                        value={newBudget}
                        onChange={handleBudgetChange}
                        placeholder="Enter new budget"
                    />
                    <Button variant="primary" onClick={submitBudget}>
                        Update Capital
                    </Button>
                </InputGroup>
            )}
        </Card>
    );
};

export default Budget;