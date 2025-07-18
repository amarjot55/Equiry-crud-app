const { configDotenv } = require('dotenv');
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

const enquiryRouter = require('./App/routes/web/enquiryRouter');
require("dotenv").config();
let app = express();

app.use(cors());
app.use(express.json());


//routes
app.use('/api/website/enquiries', enquiryRouter);

//http://localhost:8040/api/website/enquiries/insert
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});