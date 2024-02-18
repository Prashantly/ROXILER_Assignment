
import { useEffect, useState } from "react";
import Search from "./components/Search";
import SelectMonth from "./components/SelectMonth";
import Statistics from "./components/Statistics";
import Table from "./components/Table";
import axios from "axios";
import BarChart from "./components/BarChart";
import PiechartMonth from "./components/PiechartMonth";

function App() {

  // State variables for product data, search text, and selected month
  const [prodctData, setProductData] = useState([]); // Product data
  const [searchText, setSearchText] = useState(''); // Search text
  const [selectedMonth, setSelectedMonth] = useState(3); // Selected month (default: March)

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth]);

  // Function to fetch transactions from the server
  async function fetchTransactions() {
    console.log(process.env.REACT_APP_BASE_URL)
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions?month=${selectedMonth}`);
      setProductData(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }

  // Event handler for input change in the search box
  function InputChangeHandler(e) {
    console.log(e.target.value)
    setSearchText(e.target.value)
  }

  // Function to search products based on search text and selected month
  async function searchProducts() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions?search=${searchText}&month=${selectedMonth}`);
      setProductData(response.data.transactions);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  }

  // Render the main application UI
  return (
    <div className="app-container">
      <div className='dashboard-header'>
        <h2>Transaction <br />
          Dashboard</h2>
      </div>
      <div className="searchandselectwrapper">
        <div className="search">
          <Search
            searchText={searchText}
            InputChangeHandler={InputChangeHandler}
            searchProducts={searchProducts}
          />
        </div>
        <div className="select">
          <SelectMonth selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
        </div>
      </div>
      <div className="table-wrapper">
        <Table prodctData={prodctData} setProductData={setProductData} />
      </div>
      <div className="stats">
        <Statistics selectedMonth={selectedMonth} />
      </div>
      <div className="bar-graph">
        <BarChart selectedMonth={selectedMonth} />
      </div>
      <div className="pie-chart">
        <PiechartMonth selectedMonth={selectedMonth} />
      </div>
    </div>
  );
}


export default App;
