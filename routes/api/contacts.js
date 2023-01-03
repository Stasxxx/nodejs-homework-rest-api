const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts");

const {authenticate} = require("../../middlwares")

const { schemas } = require('../../models/contactsSchema');


router.get('/',authenticate, ctrl.getContacts)

router.get('/:contactId',authenticate, ctrl.getById)

router.post('/',authenticate, schemas.postValidation, ctrl.addContact)

router.delete('/:contactId', authenticate, ctrl.deleteById)

router.put('/:contactId', authenticate, schemas.putValidation, ctrl.updateById)

router.patch('/:contactId/favorite', authenticate, schemas.patchValidation, ctrl.updateStatusContact)

module.exports = router;
