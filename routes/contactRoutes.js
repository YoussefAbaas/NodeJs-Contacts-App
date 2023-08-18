const express = require("express");
const {
  getContact,
  getContacts,
  createContact,
  editContact,
  deleteContact,
} = require("../controllers/contactController");
const ValidateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(ValidateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(editContact).delete(deleteContact);

module.exports = router;
