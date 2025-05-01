// components/BudgetChart.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { ButtonGroup, Button } from 'react-bootstrap';
import { FaChartPie, FaChartBar } from 'react-icons/fa';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const BudgetChart = () => {
    const { expenses, budget, remaining, currency } = useContext(AppContext);
    const [chartType, setChartType] = useState('pie');

    const pieData = {
        labels: [...expenses.map(exp => exp.name), 'Liquidity Reserve'],
        datasets: [
            {
                data: [...expenses.map(exp => exp.cost), remaining],
                backgroundColor: [
                    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD',
                    '#D4A5A5', '#9B59B6', '#3498DB', '#E74C3C', '#2ECC71'
                ],
                borderColor: '#fff',
                borderWidth: 2,
                hoverOffset: 20
            }
        ]
    };

    const barData = {
        labels: expenses.map(exp => exp.name),
        datasets: [
            {
                label: 'Allocated Capital',
                data: expenses.map(exp => exp.cost),
                backgroundColor: '#1a2a44',
                borderColor: '#fff',
                borderWidth: 1
            },
            {
                label: 'Remaining Capital',
                data: expenses.map(() => remaining),
                backgroundColor: '#4ECDC4',
                borderColor: '#fff',
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    font: {
                        size: 14
                    },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: '#1a2a44',
                callbacks: {
                    label: function(context) {
                        return `${context.label || context.dataset.label}: ${currency}${context.parsed.toLocaleString() || context.parsed.y.toLocaleString()}`;
                    }
                }
            }
        },
        ...(chartType === 'bar' && {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => `${currency}${value.toLocaleString()}`
                    }
                }
            }
        })
    };

    return (
        <div className="chart-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3><FaChartPie className="me-2" /> Capital Distribution</h3>
                <ButtonGroup>
                    <Button
                        variant={chartType === 'pie' ? 'primary' : 'outline-primary'}
                        onClick={() => setChartType('pie')}
                    >
                        <FaChartPie /> Pie
                    </Button>
                    <Button
                        variant={chartType === 'bar' ? 'primary' : 'outline-primary'}
                        onClick={() => setChartType('bar')}
                    >
                        <FaChartBar /> Bar
                    </Button>
                </ButtonGroup>
            </div>
            {chartType === 'pie' ? <Pie data={pieData} options={options} /> : <Bar data={barData} options={options} />}
        </div>
    );
};

export default BudgetChart;