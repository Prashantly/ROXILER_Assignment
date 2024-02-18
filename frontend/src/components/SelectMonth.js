import React from 'react';
import AsyncSelect from 'react-select/async';

// Define the options for months
const monthOptions = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
];

// Function to filter months based on input value
const filterMonths = (inputValue) => {
    return monthOptions.filter((month) =>
        month.label.toLowerCase().includes(inputValue.toLowerCase())
    );
};

// Function to load options asynchronously
const loadOptions = (
    inputValue,
    callback
) => {
    setTimeout(() => {
        callback(filterMonths(inputValue));
    }, 1000);
};

// SelectMonth component to select a month
const SelectMonth = ({ selectedMonth, setSelectedMonth }) => {
    // Find the month object based on the selectedMonth value
    const monthObject = monthOptions.find(month => month.value === selectedMonth);
    const defaultValue = monthObject ? { value: monthObject.value, label: monthObject.label } : null;

    // Set default value for the Select component
    const handleChange = (selectedOption) => {
        setSelectedMonth(selectedOption.value);
        console.log(selectedOption.value) // Update the selected month in the parent component
    };

    return (
        <AsyncSelect
            cacheOptions
            loadOptions={loadOptions}
            defaultOptions
            value={defaultValue}
            onChange={handleChange}
        />
    );
};

export default SelectMonth;

