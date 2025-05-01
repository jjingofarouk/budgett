// components/AIInsights.js
import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import { FaLightbulb, FaShareAlt } from 'react-icons/fa';

const AIInsights = () => {
    const { expenses, budget, remaining, history } = useContext(AppContext);

    const insights = useMemo(() => {
        const totalSpent = expenses.reduce((sum, exp) => sum + exp.cost, 0);
        const highSpenders = expenses
            .filter(exp => exp.cost > budget * 0.2)
            .map(exp => exp.name);

        const categorySpending = expenses.reduce((acc, exp) => {
            acc[exp.category] = (acc[exp.category] || 0) + exp.cost;
            return acc;
        }, {});

        const recentTrends = history
            .slice(-5)
            .filter(entry => entry.cost > 0)
            .map(entry => ({
                name: entry.name,
                cost: entry.cost,
                date: new Date(entry.date)
            }));

        const recommendations = [];
        if (remaining < budget * 0.1) {
            recommendations.push({
                text: 'Critical: Liquidity reserve below 10%. Prioritize cost reduction in non-essential sectors.',
                severity: 'danger'
            });
        }
        if (highSpenders.length > 0) {
            recommendations.push({
                text: `High spending detected in: ${highSpenders.join(', ')}. Conduct ROI analysis for optimization.`,
                severity: 'warning'
            });
        }
        if (recentTrends.length > 0) {
            const frequentSector = recentTrends[0].name;
            recommendations.push({
                text: `Recent activity spike in ${frequentSector}. Validate alignment with strategic goals.`,
                severity: 'info'
            });
        }
        const dominantCategory = Object.entries(categorySpending).sort((a, b) => b[1] - a[1])[0]?.[0];
        if (dominantCategory && categorySpending[dominantCategory] > totalSpent * 0.5) {
            recommendations.push({
                text: `Over 50% of spending in ${dominantCategory}. Diversify allocations to mitigate risk.`,
                severity: 'warning'
            });
        }
        if (totalSpent < budget * 0.5 && remaining > budget * 0.5) {
            recommendations.push({
                text: 'Underutilized capital detected. Identify high-ROI investment opportunities.',
                severity: 'success'
            });
        }

        return recommendations;
    }, [expenses, budget, remaining, history]);

    const shareInsight = (insight) => {
        const shareText = `VaultVision Insight: ${insight.text}`;
        if (navigator.share) {
            navigator.share({
                title: 'VaultVision AI Insight',
                text: shareText
            });
        } else {
            alert('Share functionality not supported. Insight: ' + shareText);
        }
    };

    return (
        <div className="insights-container">
            <Card>
                <Card.Header><FaLightbulb className="me-2" /> Strategic Insights</Card.Header>
                <ListGroup variant="flush">
                    {insights.length > 0 ? (
                        insights.map((insight, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Badge bg={insight.severity} className="me-2">AI</Badge>
                                    {insight.text}
                                </div>
                                <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => shareInsight(insight)}
                                >
                                    <FaShareAlt />
                                </Button>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <ListGroup.Item>No actionable insights at this time.</ListGroup.Item>
                    )}
                </ListGroup>
            </Card>
        </div>
    );
};

export default AIInsights;