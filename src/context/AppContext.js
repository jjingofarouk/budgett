// context/AppContext.js (updated to include history tracking)
import React, { createContext, useReducer, useEffect } from 'react';

export const AppReducer = (state, action) => {
    let budget = state.budget;
    switch (action.type) {
        case 'ADD_EXPENSE':
            let total_budget = state.expenses.reduce(
                (previousExp, currentExp) => previousExp + currentExp.cost,
                0
            );
            total_budget += action.payload.cost;
            if (total_budget <= state.budget) {
                const updatedExpenses = state.expenses.map((currentExp) => {
                    if (currentExp.name === action.payload.name) {
                        return { ...currentExp, cost: currentExp.cost + action.payload.cost };
                    }
                    return currentExp;
                });
                return {
                    ...state,
                    expenses: updatedExpenses,
                    history: [...state.history, {
                        name: action.payload.name,
                        cost: action.payload.cost,
                        date: new Date()
                    }]
                };
            } else {
                alert("Cannot increase the allocation! Out of funds");
                return state;
            }
        case 'RED_EXPENSE':
            const red_expenses = state.expenses.map((currentExp) => {
                if (currentExp.name === action.payload.name && currentExp.cost - action.payload.cost >= 0) {
                    return { ...currentExp, cost: currentExp.cost - action.payload.cost };
                }
                return currentExp;
            });
            return {
                ...state,
                expenses: red_expenses,
                history: [...state.history, {
                    name: action.payload.name,
                    cost: -action.payload.cost,
                    date: new Date()
                }]
            };
        case 'DELETE_EXPENSE':
            const deletedExpense = state.expenses.find(exp => exp.id === action.payload);
            const updatedExpenses = state.expenses.map((currentExp) => {
                if (currentExp.id === action.payload) {
                    return { ...currentExp, cost: 0 };
                }
                return currentExp;
            }).filter(exp => exp.cost > 0);
            return {
                ...state,
                expenses: updatedExpenses,
                history: [...state.history, {
                    name: deletedExpense.name,
                    cost: -deletedExpense.cost,
                    date: new Date()
                }]
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload
            };
        case 'CHG_CURRENCY':
            return {
                ...state,
                currency: action.payload
            };
        default:
            return state;
    }
};

const initialState = {
    budget: 2000,
    expenses: [
        { id: "Marketing", name: 'Marketing', cost: 50 },
        { id: "Finance", name: 'Finance', cost: 300 },
        { id: "Sales", name: 'Sales', cost: 70 },
        { id: "Human Resource", name: 'Human Resource', cost: 40 },
        { id: "IT", name: 'IT', cost: 500 },
    ],
    currency: '£',
    history: []
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const remaining = state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

    useEffect(() => {
        localStorage.setItem('expenseHistory', JSON.stringify(state.history));
    }, [state.history]);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                budget: state.budget,
                remaining,
                dispatch,
                currency: state.currency,
                history: state.history
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};