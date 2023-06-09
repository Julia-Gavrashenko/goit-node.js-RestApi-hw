const express = require("express");
const { validateBody, authenticate} = require("../../middlewares");
const { contactsSchema, updateFavoriteSchema } = require("../../schemas/contactsSchema");


const {
  getListContacts,
  getOneContact,
  addNewContact,
  deleteContact,
  updateContact,
   updateFavorite,
} = require("../../controllers/contactsControllers");

const router = express.Router();

router
  .route("/")
  .get(authenticate, getListContacts)
  .post(authenticate, validateBody(contactsSchema), addNewContact);

router
  .route("/:contactId")
  .get(authenticate, getOneContact)
  .delete(authenticate, deleteContact)
  .put(authenticate, validateBody(contactsSchema), updateContact)



router
  .route("/:contactId/favorite")
  .patch(validateBody(updateFavoriteSchema), updateFavorite);
 

module.exports = router;
