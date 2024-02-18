import axios from 'axios';
import React, { useEffect, useState } from 'react'


import { Bar, BarChart as RechartBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import getMonthName from '../utils/getMonth';

const BarChart = ({ selectedMonth }) => {
    const [barData, setBarData] = useState([]);

    useEffect(() => {
        async function fetchBarChartData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bar-chart/${selectedMonth}`)
                console.log("BarChart Data::::", response.data)
                setBarData(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchBarChartData()
    }, [selectedMonth])

    return (
        <>
            <h2>Bar Chart Stats  for {getMonthName(selectedMonth)}</h2>
            <ResponsiveContainer width="100%" height={300} aspect={3}>
                <RechartBarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
                    <XAxis dataKey="priceRange" tick={{ fill: 'red' }} axisLine={{ stroke: 'black' }} interval={0} angle={-45} textAnchor="end" />
                    <YAxis tick={{ fill: 'green' }} axisLine={{ stroke: 'black' }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="blue" />
                </RechartBarChart>
            </ResponsiveContainer>
        </>


    )
}

export default BarChart