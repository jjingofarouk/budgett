// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AllocationForm from './components/AllocationForm';
import { AppProvider } from './context/AppContext';
import CurrencySelector from './components/CurrencySelector';
import BudgetChart from './components/BudgetChart';
import ExpenseHistory from './components/ExpenseHistory';
import './App.css';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                <CurrencySelector />
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <Budget />
                    </div>
                    <div className='col-sm'>
                        <Remaining />
                    </div>
                    <div className='col-sm'>
                        <ExpenseTotal />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <BudgetChart />
                    </div>
                </div>
                <h3 className='mt-3'>Expenses</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <ExpenseList />
                    </div>
                </div>
                <h3 className='mt-3'>Add/Modify Allocation</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <AllocationForm />
                    </div>
                </div>
                <h3 className='mt-3'>Expense History</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <ExpenseHistory />
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;