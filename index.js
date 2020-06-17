const express = require("express");
const mongoose = reqiure("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
//Innitialise express app
const app = express();
app.use(bodyParser.json());

//Create Route
const employee = require("./routes/employee");
app.use("/employee", employee);

//Connecting to mongodb

mongoose.connect(
  dbconnection,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
  (error) => {
    if (error) {
      process.exit(1);
      console.log("Connection Failed");
    } else {
      console.log("Successfully Conected");
    }
  }
);
app.listen(PORT);
