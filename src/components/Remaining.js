// components/Remaining.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, Alert } from 'react-bootstrap';

const Remaining = () => {
    const { remaining, currency, budget } = useContext(AppContext);
    const alertType = remaining < 0 ? 'danger' : remaining <= budget * 0.1 ? 'warning' : 'success';

    return (
        <Card className='p-3'>
            <Alert variant={alertType}>
                Remaining: {currency}{remaining.toLocaleString()}
            </Alert>
        </Card>
    );
};

export default Remaining;
