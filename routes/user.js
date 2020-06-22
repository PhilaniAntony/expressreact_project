const express = require("express");
const router = express.Router();
const config = require("express");
const bycript = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { check, validationResult } = require("express-validator");

//@ route GET api/users
//@desc  Get logged in user
//@access  Private
router.get("/", (req, res) => {
  res.send("Get logged in users");
});

//@ route POST api/user
//@desc  Register a  user
//@access  Public
router.post(
  "/",
  [
    check("name", "name is required").not().isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check("password", "Please set a password with 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exist" });
      }
      user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      const password = await bcyript.hast(password, salt);
      await user.save();
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      res.status(500).dend("Server Error");
    }
  }
);

module.exports = router;
