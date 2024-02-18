# MERN Stack Coding Challenge

## Backend Task

### Data Source
- **Third Party API URL:** [https://s3.amazonaws.com/roxiler.com/product_transaction.json](https://s3.amazonaws.com/roxiler.com/product_transaction.json)
- **Request Method:** GET
- **Response Format:** JSON

### APIs to Implement
1. **Initialize Database API**
   - Fetches JSON from the third-party API and initializes the database with seed data.

2. **List Transactions API**
   - Lists all transactions with support for search and pagination.
   - Searches by product title/description/price.
   - Supports pagination with default values.

3. **Statistics API**
   - Returns total sale amount, total sold items, and total unsold items for the selected month.

4. **Bar Chart API**
   - Provides price range and the number of items in each range for the selected month.

5. **Pie Chart API**
   - Finds unique categories and the number of items in each category for the selected month.

6. **Combined Data API**
   - Fetches data from all above APIs, combines the response, and sends a final JSON response.

## Frontend Task

### Transactions Table
- Lists transactions based on selected month with search and pagination.
- Default month selection is March.
- Provides search functionality by title/description/price.
- Supports pagination with Next and Previous buttons.

### Transactions Statistics
- Displays total sale amount, total sold items, and total unsold items for the selected month.

### Transactions Bar Chart
- Shows price range and the number of items in each range for the selected month.

**Note:** Implement your own design while following the provided mockups for the frontend components.


### Screen Shots

![pic4](https://github.com/Prashantly/ROXILER_Assignment/assets/99544800/595fc21b-f9bc-4b4e-a653-114608e80c9e)
![pic3](https://github.com/Prashantly/ROXILER_Assignment/assets/99544800/a6b36f57-2b5f-485e-b55b-ebf1a69f7531)
![PIc2](https://github.com/Prashantly/ROXILER_Assignment/assets/99544800/7d049915-1685-4af5-bf0c-bdb3b6b2e1fc)
![pic1](https://github.com/Prashantly/ROXILER_Assignment/assets/99544800/3ee077a0-3ca4-470f-aea6-32a709c18cae)
