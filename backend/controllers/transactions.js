const Transaction = require("../models/transaction");

// Endpoint to list all transactions with search, month filter, and pagination
async function getTransactions(req, res) {
    try {
        const { search, month = 3, page = 1, perPage = 10 } = req.query;
        const skip = (page - 1) * perPage;

        // Define the search conditions based on the presence of the search query
        const searchConditions = search ? {
            $or: [
                { title: { $regex: new RegExp(search, 'i') } },
                { description: { $regex: new RegExp(search, 'i') } },
                { price: !isNaN(search) ? parseFloat(search) : null }
            ]
        } : {};

        // Define the filter condition for the month
        const monthFilter = { $expr: { $eq: [{ $month: "$dateOfSale" }, !isNaN(month) ? parseInt(month) : null] } };

        // Combine search conditions and month filter
        const query = {
            ...searchConditions,
            ...monthFilter
        };

        // Fetch transactions based on the query
        const transactions = await Transaction.find(query)
            .skip(skip)
            .limit(perPage);

        // Count total number of documents
        const totalProducts = await Transaction.countDocuments(query);

        res.status(200).json({ transactions, totalProducts });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getTransactions
};