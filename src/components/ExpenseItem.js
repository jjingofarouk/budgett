// components/ExpenseItem.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Button } from 'react-bootstrap';
import { FaTrashAlt } from 'react-icons/fa';

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
            <td>
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
