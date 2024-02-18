import React from 'react'

const Search = ({ searchText, InputChangeHandler, searchProducts }) => {
    return (
        <>
            <input type="text"
                value={searchText}
                id="searchInput"
                placeholder="Search..."
                onChange={InputChangeHandler}
            />
            <button id="searchButton" onClick={searchProducts}>Search</button>

        </>

    )
}

export default Search