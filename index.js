const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

//Initialise  express app
const app = express();
//Use body parser
app.use(express.json({ extended: false }));
//Connect to database
//connectDB();

//Define routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.listen(PORT);
