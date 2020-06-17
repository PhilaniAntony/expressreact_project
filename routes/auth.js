const express = require("express");
const router = express.Router();

//@ route GET api/uauth
//@desc  Get logged in user
//@access  Private
router.get("/", (req, res) => {
  res.send("Get logged in users");
});

//@ route POST api/auth
//@desc  Auth user & get token
//@access  Public
router.post("/", (req, res) => {
  res.send("Authehnticate users");
});

module.exports = router;
