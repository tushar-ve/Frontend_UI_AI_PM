import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import api from '../Api';
import "./chatDataVisulization.css";

const ChatDataVisualization = ({ refresh }) => {
    const [chatData, setChatData] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: []
    });

    useEffect(() => {
        const fetchChatData = async () => {
            try {
                const response = await api.get('/chat-history/', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('access')}` }
                });
                setChatData(response.data);
            } catch (error) {
                console.error("There was an error fetching the chat data!", error);
            }
        };

        fetchChatData();
    }, [refresh]); // Add refresh as a dependency

    useEffect(() => {
        if (chatData.length) {
            const messages = chatData.map(data => data.message);
            const responseTimes = chatData.map(data => new Date(data.timestamp).getTime());

            setChartData({
                labels: messages,
                datasets: [
                    {
                        label: 'Response Times',
                        data: responseTimes,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            });
        }
    }, [chatData]);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    maxTicksLimit: 10
                }
            },
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Chat Data Visualization</h2>
            {chartData.labels.length > 0 ? (
                <div className="chart-container space-y-4">
                    <div className="chart bg-gray-100 p-4 rounded">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                    <div className="chart bg-gray-100 p-4 rounded">
                        <Line data={chartData} options={chartOptions} />
                    </div>
                    <div className="chart bg-gray-100 p-4 rounded">
                        <Pie data={{
                            ...chartData,
                            datasets: [
                                {
                                    ...chartData.datasets[0],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.6)',
                                        'rgba(54, 162, 235, 0.6)',
                                        'rgba(255, 206, 86, 0.6)',
                                        'rgba(75, 192, 192, 0.6)',
                                        'rgba(153, 102, 255, 0.6)',
                                        'rgba(255, 159, 64, 0.6)'
                                    ]
                                }
                            ]
                        }} options={chartOptions} />
                    </div>
                </div>
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default ChatDataVisualization;
