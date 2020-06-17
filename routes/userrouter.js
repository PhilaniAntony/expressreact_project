const express = require("express");
const router = express.Router();

//@ route GET api/users
//@desc  Get logged in user
//@access  Private
router.get("/", (req, res) => {
  res.send("Get logged in users");
});

//@ route POST api/user
//@desc  Register a  user
//@access  Public
router.post("/", (req, res) => {
  res.send("Register a  users");
});

module.exports = router;
