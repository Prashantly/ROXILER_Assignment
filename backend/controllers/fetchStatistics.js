const Transaction = require("../models/transaction");


// Controller function to fetch statistics for a specific month
async function fetchStatistics(req, res) {
    try {
        // Extract month from query parameter
        const { month } = req.params;

        // Check if month parameter is provided
        if (!month) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        // Aggregate data to calculate statistics
        const statistics = await Transaction.aggregate([

            {
                // Project stage: Extract month from dateOfSale field
                $project: {
                    month: {
                        $month: '$dateOfSale',
                    },
                    price: true,
                    sold: true,
                }
            },

            {
                // Match stage: Filter documents for the specified month
                $match: {
                    month: parseInt(month),
                }
            },
            {
                // Group stage: Calculate statistics
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: { $cond: [{ $eq: ['$sold', true] }, '$price', 0] } },
                    totalSoldItems: { $sum: { $cond: [{ $eq: ['$sold', true] }, 1, 0] } },
                    totalUnsoldItems: { $sum: { $cond: [{ $eq: ['$sold', false] }, 1, 0] } }
                }
            },
            {
                // Project stage: Exclude _id field from the result
                $project: {
                    _id: 0
                }
            }
        ])

        // Send the calculated statistics as the response
        res.status(200).json(statistics[0] || { // Return empty object if no data found for the month
            totalSaleAmount: 0,
            totalSoldItems: 0,
            totalUnsoldItems: 0,
        });


    } catch (error) {
        // Handle errors
        console.error('Error fetching statistics:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    fetchStatistics
}