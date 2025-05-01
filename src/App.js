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
import BudgetForecast from './components/BudgetForecast';
import CollaborationPanel from './components/CollaborationPanel';
import AIInsights from './components/AIInsights';
import './App.css';

const App = () => {
    return (
        <AppProvider>
            <div className='container'>
                <header className='header'>
                    <img src="/logo.png" alt="VaultVision Logo" className="logo" />
                    <h1>VaultVision: Enterprise Wealth Architect</h1>
                </header>
                <CurrencySelector />
                <div className='row mt-3 dashboard-grid'>
                    <div className='col-md-4'>
                        <Budget />
                    </div>
                    <div className='col-md-4'>
                        <Remaining />
                    </div>
                    <div className='col-md-4'>
                        <ExpenseTotal />
                    </div>
                </div>
                <div className='row mt-3'>
                    <div className='col-md-6'>
                        <BudgetChart />
                    </div>
                    <div className='col-md-6'>
                        <BudgetForecast />
                    </div>
                </div>
                <h3 className='mt-3'>Strategic Allocations</h3>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <ExpenseList />
                    </div>
                </div>
                <h3 className='mt-3'>Resource Allocation</h3>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <AllocationForm />
                    </div>
                </div>
                <h3 className='mt-3'>AI-Powered Insights</h3>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <AIInsights />
                    </div>
                </div>
                <h3 className='mt-3'>Collaboration Hub</h3>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <CollaborationPanel />
                    </div>
                </div>
                <h3 className='mt-3'>Transaction Ledger</h3>
                <div className='row mt-3'>
                    <div className='col-12'>
                        <ExpenseHistory />
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};

export default App;