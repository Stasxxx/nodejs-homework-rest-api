const express = require('express');
const contacts = require("../../models/contacts");

const router = express.Router();
const { postValidation, putValidation } = require('../../middlwares/validationMiddleware');

router.get('/', async (req, res, next) => {
  const contactList = await contacts.listContacts();  
  res.json(contactList);
})

router.get('/:contactId', async (req, res, next) => {
  const oneContact = await contacts.getContactById(req.params.contactId);
  if (oneContact.error) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(oneContact);
})

router.post('/', postValidation, async (req, res, next) => {
  const postContact = await contacts.addContact(req.body);
  res.status(201).json(postContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const deleteContact = await contacts.removeContact(req.params.contactId)
  if (deleteContact === null) {
    return res.status(404).json({ message: "Not found" });
  };
  res.json({ message: "contact deleted" });
})

router.put('/:contactId', putValidation, async (req, res, next) => {
  const updateContact = await contacts.updateContact(req.params.contactId, req.body);
  if (updateContact === null) {
    return res.status(404).json({ message: "Not found" });
  };
  res.json(updateContact);
})

module.exports = router
