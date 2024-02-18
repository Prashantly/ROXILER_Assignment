const { default: axios } = require("axios");
const Transaction = require("../models/transaction")

// Controller function to initialize the database with transaction data
async function databaseInitialization(req, res) {
    try {

        // Make a request to fetch transaction data from an external source
        const response = await axios('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        // Extract transaction data from the response
        const transactions = response.data;


        // Insert transaction data into the database
        await Transaction.insertMany(transactions);
        // Send a success response
        return res.status(201).json({ message: 'Database initialized successfully' });

    } catch (error) {
        // Handle errors
        console.error('Error initializing database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {
    databaseInitialization
}