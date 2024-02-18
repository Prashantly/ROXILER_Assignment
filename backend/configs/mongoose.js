const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/roxiler';

async function connectDB() {
    try {
        await mongoose.connect(uri);

        console.log('Connected to MongoDB database');
    } catch (err) {
        // Log the error message
        console.error('MongoDB connection error:', err);
    }
}

module.exports = connectDB;