const axios = require('axios');

// Controller function to combine data from all APIs for a specific month
async function combineDataFromAllApis(req, res) {

    try {

        // Extract the month parameter from the request
        const { month } = req.params;

        // Make requests to all three APIs concurrently
        const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
            axios.get(`http://localhost:8001/statistics/${month}`),
            axios.get(`http://localhost:8001/bar-chart/${month}`),
            axios.get(`http://localhost:8001/pie-chart/${month}`)
        ]);

        // Extract data from responses
        const statisticsData = statisticsResponse.data;
        const barChartData = barChartResponse.data;
        const pieChartData = pieChartResponse.data;

        // Combine the data into a single object
        const combinedData = {
            statistics: statisticsData,
            barChart: barChartData,
            pieChart: pieChartData
        };

        // Send the combined data as the response
        res.status(200).json(combinedData);

    } catch (error) {
        // Handle errors
        console.error('Error combining data from all APIs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    combineDataFromAllApis
}