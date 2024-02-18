const express = require('express');

const router = express.Router();

// Import controllers
const { databaseInitialization } = require('../controllers/databaseInit');
const { getTransactions } = require('../controllers/transactions');
const { fetchStatistics } = require('../controllers/fetchStatistics');
const { getBarChartDataByMonth } = require('../controllers/barChartByMonth');
const { getPieChartDataByMonth } = require('../controllers/PieChartByMonth');
const { combineDataFromAllApis } = require('../controllers/combineData');

// Define routes
// Route to initialize the database
router.get('/', databaseInitialization)

// Route to get transactions
router.get('/transactions', getTransactions)

// Route to fetch statistics for a specific month
router.get('/statistics/:month', fetchStatistics)

// Route to get bar chart data for a specific month
router.get('/bar-chart/:month', getBarChartDataByMonth)

// Route to get pie chart data for a specific month
router.get('/pie-chart/:month', getPieChartDataByMonth)

// Route to combine data from all APIs for a specific month
router.get('/combine/:month', combineDataFromAllApis)

module.exports = router;