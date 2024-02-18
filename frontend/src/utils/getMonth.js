import monthMap from '../months';

function getMonthName(monthNumber) {
    // Iterate over the entries of monthMap
    for (const [monthName, value] of Object.entries(monthMap)) {
        // Check if the value matches the provided monthNumber
        if (value === monthNumber) {
            // Return the corresponding monthName
            return monthName;
        }
    }
    // Return null if no matching monthName is found
    return null;
}

export default getMonthName;