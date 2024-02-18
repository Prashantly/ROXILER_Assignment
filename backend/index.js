const express = require("express");
const app = express();
const connectDB = require("./configs/mongoose")
const cors = require('cors')

const PORT = 8001
connectDB();

app.use(cors())
app.use('/', require("./routes"))


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})