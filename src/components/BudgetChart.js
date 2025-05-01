// components/BudgetChart.js
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const BudgetChart = () => {
    const { expenses, budget, remaining, currency } = useContext(AppContext);

    const data = {
        labels: [...expenses.map(exp => exp.name), 'Remaining'],
        datasets: [
            {
                data: [...expenses.map(exp => exp.cost), remaining],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#E7E9ED'
                ],
                borderColor: '#fff',
                borderWidth: 2
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${currency}${context.parsed.toLocaleString()}`;
                    }
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h3>Budget Allocation</h3>
            <Pie data={data} options={options} />
        </div>
    );
};

export default BudgetChart;