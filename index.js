const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const PORT = process.env.PORT || 5000;

//Initialise  express app
const app = express();
//Use body parser
app.use(express.json({ extended: false }));
//Connect to database
connectDB();
app.get("/", (req, res) => res.json({ msg: "Hello pills" }));
//Define routes
app.use("/api/user", require("./routes/user"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

//Serve Static assest in production
//if (process.env.NODE_ENV === "production") {
//Set Static folder
//app.use(express.static("client/build"));

//app.get("*", (req, res) =>
//  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
//);
//}
//--slrGVIchKV0wiour
