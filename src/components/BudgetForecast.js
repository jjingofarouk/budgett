// components/BudgetForecast.js
import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { FaChartLine, FaDownload } from 'react-icons/fa';

ChartJS.register(LineElement, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend);

const BudgetForecast = () => {
    const { expenses, budget, history, currency } = useContext(AppContext);
    const [months, setMonths] = useState(6);
    const [confidence, setConfidence] = useState(0.9);
    const [scenario, setScenario] = useState('base');

    const forecastData = useMemo(() => {
        const today = new Date();
        const dates = Array.from({ length: months }, (_, i) => {
            const date = new Date(today);
            date.setMonth(today.getMonth() + i);
            return date;
        });

        const historicalTrend = history
            .filter(entry => entry.cost !== 0)
            .reduce((acc, entry) => {
                const month = new Date(entry.date).toISOString().slice(0, 7);
                acc[month] = (acc[month] || 0) + entry.cost;
                return acc;
            }, {});

        const monthlyAvg = Object.values(historicalTrend).length > 0
            ? Object.values(historicalTrend).reduce((sum, val) => sum + val, 0) / Object.values(historicalTrend).length
            : expenses.reduce((sum, exp) => sum + exp.cost, 0) / 12;

        const variance = Object.values(historicalTrend).length > 0
            ? Math.sqrt(Object.values(historicalTrend).reduce((sum, val) => sum + Math.pow(val - monthlyAvg, 2), 0) / Object.values(historicalTrend).length)
            : monthlyAvg * 0.1;

        const scenarioAdjustments = {
            base: 1,
            optimistic: 0.8,
            pessimistic: 1.2
        };

        let runningBudget = budget;
        const forecast = dates.map((date, i) => {
            const adjustedAvg = monthlyAvg * confidence * scenarioAdjustments[scenario];
            runningBudget -= adjustedAvg;
            return {
                x: date,
                y: Math.max(0, runningBudget)
            };
        });

        const upperBound = dates.map((date, i) => ({
            x: date,
            y: Math.max(0, forecast[i].y + variance * 1.96)
        }));

        const lowerBound = dates.map((date, i) => ({
            x: date,
            y: Math.max(0, forecast[i].y - variance * 1.96)
        }));

        return {
            datasets: [
                {
                    label: 'Projected Capital',
                    data: forecast,
                    borderColor: '#1a2a44',
                    backgroundColor: 'rgba(26, 42, 68, 0.2)',
                    fill: false,
                    tension: 0.4
                },
                {
                    label: 'Upper Confidence Bound',
                    data: upperBound,
                    borderColor: '#4ECDC4',
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                },
                {
                    label: 'Lower Confidence Bound',
                    data: lowerBound,
                    borderColor: '#FF6B6B',
                    borderDash: [5, 5],
                    fill: false,
                    pointRadius: 0
                }
            ]
        };
    }, [budget, expenses, history, months, confidence, scenario]);

    const options = {
        responsive: true,
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'month'
                },
                title: {
                    display: true,
                    text: 'Timeline'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Capital'
                },
                ticks: {
                    callback: (value) => `${currency}${value.toLocaleString()}`
                }
            }
        },
        plugins: {
            legend: {
                position: 'top'
            },
            tooltip: {
                callbacks: {
                    label: (context) => `${context.dataset.label}: ${currency}${context.parsed.y.toLocaleString()}`
                }
            }
        }
    };

    const exportForecast = () => {
        const csvContent = [
            ['Date', 'Projected Capital', 'Upper Bound', 'Lower Bound'],
            ...forecastData.datasets[0].data.map((point, i) => [
                point.x.toISOString().slice(0, 7),
                point.y.toLocaleString(),
                forecastData.datasets[1].data[i].y.toLocaleString(),
                forecastData.datasets[2].data[i].y.toLocaleString()
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `vaultvision_forecast_${scenario}.csv`;
        link.click();
    };

    return (
        <div className="forecast-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3><FaChartLine className="me-2" /> Capital Forecast</h3>
                <div className="d-flex gap-2 align-items-center">
                    <Form className="d-flex gap-2">
                        <Form.Group>
                            <Form.Label className="me-2">Months</Form.Label>
                            <Form.Control
                                as="select"
                                value={months}
                                onChange={(e) => setMonths(parseInt(e.target.value))}
                                style={{ width: '100px' }}
                            >
                                {[3, 6, 12, 24].map(m => (
                                    <option key={m} value={m}>{m}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="me-2">Confidence</Form.Label>
                            <Form.Control
                                as="select"
                                value={confidence}
                                onChange={(e) => setConfidence(parseFloat(e.target.value))}
                                style={{ width: '100px' }}
                            >
                                {[0.8, 0.9, 0.95, 0.99].map(c => (
                                    <option key={c} value={c}>{c * 100}%</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className="me-2">Scenario</Form.Label>
                            <Dropdown>
                                <Dropdown.Toggle variant="outline-primary" id="scenario-dropdown">
                                    {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => setScenario('base')}>Base</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setScenario('optimistic')}>Optimistic</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setScenario('pessimistic')}>Pessimistic</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Form.Group>
                    </Form>
                    <Button variant="outline-secondary" onClick={exportForecast}>
                        <FaDownload /> Export
                    </Button>
                </div>
            </div>
            <Line data={forecastData} options={options} />
        </div>
    );
};

export default BudgetForecast;