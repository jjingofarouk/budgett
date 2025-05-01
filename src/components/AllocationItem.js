// components/AllocationForm.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

const AllocationForm = () => {
    const { dispatch, remaining, currency } = useContext(AppContext);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [action, setAction] = useState('Add');
    const [category, setCategory] = useState('');
    const sectors = [
        'Marketing', 'Finance', 'Sales', 'Human Resource', 'IT', 
        'Operations', 'R&D', 'Legal', 'Customer Success', 'Innovation'
    ];
    const categories = ['Capital', 'Operational', 'Strategic', 'Emergency'];

    const submitEvent = () => {
        const expense = {
            name,
            cost: parseInt(cost),
            category
        };

        if (action === 'Reduce') {
            dispatch({
                type: 'RED_EXPENSE',
                payload: expense,
            });
        } else {
            if (expense.cost > remaining) {
                alert("Insufficient liquidity reserve!");
                return;
            }
            dispatch({
                type: 'ADD_EXPENSE',
                payload: expense,
            });
        }

        setCost('');
        setName('');
        setCategory('');
    };

    return (
        <Form>
            <Row className="align-items-end">
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Sector</Form.Label>
                        <Form.Control
                            as="select"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        >
                            <option value="">Select Sector</option>
                            {sectors.map((sector) => (
                                <option key={sector} value={sector}>{sector}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control
                            as="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Investment ({currency})</Form.Label>
                        <InputGroup>
                            <InputGroup.Text>{currency}</InputGroup.Text>
                            <Form.Control
                                type="number"
                                required
                                value={cost}
                                onChange={(e) => setCost(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                </Col>
                <Col md={2}>
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
                <Col md={1}>
                    <Button
                        variant="primary"
                        onClick={submitEvent}
                        disabled={!name || !cost || cost <= 0 || !category}
                    >
                        {action === 'Add' ? <FaPlusCircle /> : <FaMinusCircle />}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default AllocationForm;