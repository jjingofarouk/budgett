// components/ExpenseItem.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Button, Badge } from 'react-bootstrap';
import { FaTrashAlt, FaChartBar } from 'react-icons/fa';

const ExpenseItem = (props) => {
    const { dispatch, currency } = useContext(AppContext);

    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: props.id,
        });
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{currency}{props.cost.toLocaleString()}</td>
            <td>{props.category}</td>
            <td>
                <Badge bg={props.cost > 1000 ? 'warning' : 'success'}>
                    {props.cost > 1000 ? 'High' : 'Stable'}
                </Badge>
            </td>
            <td>
                <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => alert(`Analytics for ${props.name} coming soon!`)}
                >
                    <FaChartBar />
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDeleteExpense}
                >
                    <FaTrashAlt />
                </Button>
            </td>
        </tr>
    );
};

export default ExpenseItem;