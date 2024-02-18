import React, { useEffect, useState } from 'react';
import '../styles/table.css'
import axios from "axios"

// Table component for displaying product data with pagination
const Table = ({ prodctData, setProductData }) => {

    // State variables for loading indicator, page number, items per page, and total pages
    const [loading, setLoading] = useState(true);
    const [pageNo, setPageNo] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0)

    // Effect hook to fetch transactions when page number or items per page change
    useEffect(() => {
        setLoading(true)
        async function getTransactions() {

            // Fetch transactions from the server based on pagination parameters
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/transactions?page=${pageNo}&perPage=${perPage}`);
            setProductData(response.data.transactions);
            setTotalPages(Math.ceil(response.data.totalProducts / perPage));
        }
        setLoading(false)

        getTransactions(); // Call the function to fetch transactions

    }, [pageNo, perPage, setProductData])

    // Function to handle going to the previous page
    function handlePrevPage() {
        if (pageNo > 1) {
            setPageNo(pageNo - 1)
        }
    }

    // Function to handle going to the next page
    function handleNextPage() {
        if (prodctData.length === 0) {
            return
        }
        setPageNo(pageNo + 1);
    }

    // Function to handle loading more items
    function handleLoadMore() {
        setPerPage(perPage + 10); // Increase perPage value by 10
    }

    // Render the table component
    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Sold</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        !prodctData.length &&
                        <tr> <td colSpan="7"><h2 style={{ color: '#2F4F4F', textAlign: "center" }}>No Products to show</h2></td></tr>

                    }

                    {
                        loading ? (
                            <tr> <td colSpan="7">Loading...</td></tr>
                        ) :
                            (prodctData.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.description}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.sold ? 'Yes' : 'No'}</td>
                                    <td><img src={item.image} alt={item.title} /></td>
                                </tr>
                            )))
                    }
                </tbody>
            </table>
            <div className='load-more'>
                <button onClick={handleLoadMore}>Load More</button>
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={pageNo === 1}>Prev</button>
                <span>Page {pageNo}</span>
                <button onClick={handleNextPage} disabled={pageNo === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default Table;
