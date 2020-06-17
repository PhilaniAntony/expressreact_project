const express = require("express");
const employeeRouter = express.Router();
const EmployeeModel = require("../model/Employee");

//CRUD

//READ
employeeRouter.get("/", (req, res) => {
  EmployeeModel.find({}, (err, response) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Unable to get employee",
          msgError: true,
        },
      });
    } else {
      res.status(200).json(response);
    }
  });
});

//Create
employeeRouter.post("/", (req, res) => {
  const employee = new EmployeeModel(req.body);
  employee.save((err, document) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Unable to add employee",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: "Employee added",
          msgError: false,
        },
      });
    }
  });
});
//Delete

employeeRouter.delete("/:id", (req, res) => {
  EmployeeModel.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      res.status(500).json({
        message: {
          msgBody: "Unable to delete employee",
          msgError: true,
        },
      });
    } else {
      res.status(200).json({
        message: {
          msgBody: "Employee deleted",
          msgError: false,
        },
      });
    }
  });
});

//Update Router

employeeRouter.put(":id", (req, res) => {
  EmployeeModel.findOneAndUpdate(
    req.params,
    req.body,
    { runValidators: true },
    (err) => {
      if (err) {
        res.status(500).json({
          message: {
            msgBody: "Unable to update employee",
            msgError: true,
          },
        });
      } else {
        res.status(200).json({
          message: {
            msgBody: "Employee update",
            msgError: false,
          },
        });
      }
    }
  );
});

module.exports = employeeRouter;
