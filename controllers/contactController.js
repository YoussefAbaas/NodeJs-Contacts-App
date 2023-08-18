// @desc get all description
// @route GET /api/getcontacts
// @access public

const AsyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = AsyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

const createContact = AsyncHandler(async (req, res) => {
  console.log("body is", req.body);
  const { name, telephone } = req.body;
  if (!name || !telephone) {
    res.status(400);
    throw new Error("not valid data");
  } else {
    const contact = await Contact.create({
      name,
      telephone,
      user_id: req.user.id,
    });
    res.status(201).json(contact);
  }
});

const getContact = AsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  res.status(200).json(contact);
});

const editContact = AsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user does not have permission to edit that");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedContact);
});

const deleteContact = AsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("contact not found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("user does not have permission to delete that");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  createContact,
  getContact,
  editContact,
  deleteContact,
};
