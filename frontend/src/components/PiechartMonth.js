import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import getMonthName from '../utils/getMonth';

const PiechartMonth = ({ selectedMonth }) => {
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        async function fetchPieChartData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/pie-chart/${selectedMonth}`);
                setPieChartData(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPieChartData();
    }, [selectedMonth]);

    const COLORS = ['#f49d37', '#ffab00', '#ffcf33', '#ffc107'];

    return (
        <>
            <h2>Pie Chart Category Stats for {getMonthName(selectedMonth)}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={pieChartData}
                        dataKey="count"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}

export default PiechartMonth;