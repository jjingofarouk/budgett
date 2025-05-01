// context/AppContext.js
import React, { createContext, useReducer, useEffect } from 'react';

export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            const totalBudget = state.expenses.reduce(
                (total, expense) => total + expense.cost,
                0
            ) + action.payload.cost;

            if (totalBudget <= state.budget) {
                const expenseExists = state.expenses.find(exp => exp.name === action.payload.name);
                let updatedExpenses;

                if (expenseExists) {
                    updatedExpenses = state.expenses.map(exp => {
                        if (exp.name === action.payload.name) {
                            return { ...exp, cost: exp.cost + action.payload.cost };
                        }
                        return exp;
                    });
                } else {
                    updatedExpenses = [
                        ...state.expenses,
                        {
                            id: `${action.payload.name}-${Date.now()}`,
                            name: action.payload.name,
                            cost: action.payload.cost,
                            category: action.payload.category
                        }
                    ];
                }

                return {
                    ...state,
                    expenses: updatedExpenses,
                    history: [
                        ...state.history,
                        {
                            name: action.payload.name,
                            cost: action.payload.cost,
                            category: action.payload.category,
                            date: new Date()
                        }
                    ]
                };
            } else {
                alert('Insufficient liquidity reserve!');
                return state;
            }
        }

        case 'RED_EXPENSE': {
            const updatedExpenses = state.expenses
                .map(exp => {
                    if (exp.name === action.payload.name && exp.cost - action.payload.cost >= 0) {
                        return { ...exp, cost: exp.cost - action.payload.cost };
                    }
                    return exp;
                })
                .filter(exp => exp.cost > 0);

            return {
                ...state,
                expenses: updatedExpenses,
                history: [
                    ...state.history,
                    {
                        name: action.payload.name,
                        cost: -action.payload.cost,
                        category: action.payload.category,
                        date: new Date()
                    }
                ]
            };
        }

        case 'DELETE_EXPENSE': {
            const deletedExpense = state.expenses.find(exp => exp.id === action.payload);
            const updatedExpenses = state.expenses
                .map(exp => {
                    if (exp.id === action.payload) {
                        return { ...exp, cost: 0 };
                    }
                    return exp;
                })
                .filter(exp => exp.cost > 0);

            return {
                ...state,
                expenses: updatedExpenses,
                history: [
                    ...state.history,
                    {
                        name: deletedExpense.name,
                        cost: -deletedExpense.cost,
                        category: deletedExpense.category,
                        date: new Date()
                    }
                ]
            };
        }

        case 'SET_BUDGET': {
            if (action.payload < 0) {
                alert('Budget cannot be negative!');
                return state;
            }
            return {
                ...state,
                budget: action.payload
            };
        }

        case 'CHG_CURRENCY': {
            return {
                ...state,
                currency: action.payload
            };
        }

        case 'CLEAR_HISTORY': {
            return {
                ...state,
                history: []
            };
        }

        default:
            return state;
    }
};

const initialState = {
    budget: 500000,
    expenses: [
        { id: 'Marketing-1', name: 'Marketing', cost: 50000, category: 'Strategic' },
        { id: 'Finance-1', name: 'Finance', cost: 75000, category: 'Operational' },
        { id: 'Sales-1', name: 'Sales', cost: 60000, category: 'Strategic' },
        { id: 'Human Resource-1', name: 'Human Resource', cost: 45000, category: 'Operational' },
        { id: 'IT-1', name: 'IT', cost: 80000, category: 'Capital' }
    ],
    currency: '£',
    history: []
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);
    const remaining = state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

    useEffect(() => {
        const storedHistory = localStorage.getItem('expenseHistory');
        if (storedHistory) {
            dispatch({
                type: 'SET_HISTORY',
                payload: JSON.parse(storedHistory)
            });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('expenseHistory', JSON.stringify(state.history));
    }, [state.history]);

    return (
        <AppContext.Provider
            value={{
                budget: state.budget,
                expenses: state.expenses,
                remaining,
                currency: state.currency,
                history: state.history,
                dispatch
            }}
        >
            {children}
        </AppContext.Provider>
    );
};