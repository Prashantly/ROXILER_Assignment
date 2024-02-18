const Transaction = require("../models/transaction");


async function getPieChartDataByMonth(req, res) {

    try {

        const { month } = req.params;

        if (!month || !parseInt(month)) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const transactions = await Transaction.find({
            $expr: { $eq: [{ $month: '$dateOfSale' }, parseInt(month)] }
        });

        const categoryCounts = {}

        transactions.forEach(transaction => {
            const category = transaction.category;

            if (categoryCounts[category]) {
                categoryCounts[category]++;
            } else {
                categoryCounts[category] = 1;
            }
        })

        const pieChartData = Object.keys(categoryCounts).map((category) => {
            return {
                category: category,
                count: categoryCounts[category],
            }
        })

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error fetching Pie chart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


module.exports = {
    getPieChartDataByMonth
}