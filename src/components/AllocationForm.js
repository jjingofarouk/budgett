// components/AllocationForm.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Form, Button, Row, Col } from 'react-bootstrap';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('Add');
    const departments = ['Marketing', 'Finance', 'Sales', 'Human Resource', 'IT', 'Operations', 'R&D'];

    const submitEvent = () => {
        const expense = {
            name: name,
            cost: parseInt(cost),
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            if (expense.cost > remaining) {
                alert("The cost cannot exceed remaining funds!");
                return;
            }
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        setCost('');
        setName('');
    };

    return (
        <Form>
            <Row>
                <Col sm>
                    <Form.Group>
                        <Form.Label>Department</Form.Label>
                        <Form.Control
                            as="select"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm>
                    <Form.Group>
                        <Form.Label>Amount ({currency})</Form.Label>
                        <Form.Control
                            type="number"
                            required
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                        />
                    </Form.Group>
                </Col>
                <Col sm>
                    <Form.Group>
                        <Form.Label>Action</Form.Label>
                        <Form.Control
                            as="select"
                            value={action}
                            onChange={(e) => setAction(e.target.value)}
                        >
                            <option>Add</option>
                            <option>Reduce</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm>
                    <Button
                        variant="primary"
                        onClick={submitEvent}
                        className="mt-4"
                        disabled={!name || !cost || cost <= 0}
                    >
                        Save
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AllocationForm;
