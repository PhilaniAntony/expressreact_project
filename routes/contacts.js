const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const User = require("../model/User");
const Contact = require("../model/contacts");
const auth = require("../middleware/auth");

//@ route GET api/contacts
//@desc  Get oall user contacts
//@access  Private
router.get("/", auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).send("Server  error");
  }
});

//@ route POST api/contacts
//@desc  Add new contacts
//@access  Private
router.post(
  "/",
  [auth, [check("name", "name is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id,
      });
      const contact = await newContact.save();
      await user.save();
      res.json(contact);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  }
);
//@ route PUT api/contacts/:id
//@desc  Update contacts
//@access  Private
router.put("/:id", auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  //Build Conctact object
  const contactFileds = {};
  if (name) contactFileds.name = name;
  if (email) contactFileds.email = email;
  if (phone) contactFileds.phone = phone;
  if (type) contactFileds.type = type;

  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Verify Contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: contactFileds,
      },
      {
        new: true,
      }
    );
    res.json(contact);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

//@ route DELETE api/contacts/:id
//@desc  Delete a  contacts
//@access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ msg: "Contact not found" });

    //Verify Contact
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
    }
    await Contact.findOneAndRemove(req.params.id);
    res.json({ msg: "contact removed" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
