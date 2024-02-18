import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getMonthName from '../utils/getMonth';

// Statistics component for displaying statistics based on selected month
const Statistics = ({ selectedMonth }) => {

    // State variable for storing statistics data
    const [stats, setStats] = useState({});

    // Effect hook to fetch statistics data when selectedMonth changes
    useEffect(() => {

        async function fetchStatistics() {
            try {

                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/statistics/${selectedMonth}`);
                setStats(response.data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchStatistics();

    }, [selectedMonth])// Dependency for the effect hook

    // Render the statistics component
    return (
        <>
            <h2>Statistics {getMonthName(selectedMonth)}</h2>
            <div className='stats-wrapper'>
                <p>Total sale<span>{stats.totalSaleAmount}</span></p>
                <p>Total sold Item<span>{stats.totalSoldItems}</span></p>
                <p>Total not sold Item<span>{stats.totalUnsoldItems}</span></p>
            </div>

        </>

    )
}

export default Statistics