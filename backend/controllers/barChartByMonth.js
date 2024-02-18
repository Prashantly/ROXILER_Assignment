const Transaction = require("../models/transaction");

// Define price ranges
const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity } // Anything above 900
];


// Controller function to fetch bar chart data for a specific month
async function getBarChartDataByMonth(req, res) {

    try {
        // Extract month from parameter
        const { month } = req.params;

        // Validate the month parameter
        if (!month || !parseInt(month)) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        // Fetch transactions for the given month irrespective of the year
        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
        });

        // Initialize counts for each price range
        const counts = Array(priceRanges.length).fill(0);

        // Count transactions falling into each price range
        transactions.forEach(transaction => {
            const price = transaction.price;
            for (let i = 0; i < priceRanges.length; i++) {
                const { min, max } = priceRanges[i];
                if (price >= min && price < max) {
                    counts[i]++;
                    break;
                }
            }
        });

        // Construct response format
        const barChartData = counts.map((count, index) => ({
            priceRange: `${priceRanges[index].min}-${priceRanges[index].max}`,
            count: count
        }));
        res.status(200).json(barChartData);

    } catch (error) {
        // Handle errors
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


module.exports = {
    getBarChartDataByMonth
}