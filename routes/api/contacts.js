const express = require('express');

const router = express.Router();

const ctrl = require("../../controllers/contacts")

const { schemas } = require('../../models/contactsSchema');


router.get('/', ctrl.getContacts)

router.get('/:contactId', ctrl.getById)

router.post('/', schemas.postValidation, ctrl.addContact)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', schemas.putValidation, ctrl.updateById)

router.patch('/:contactId/favorite', schemas.patchValidation, ctrl.updateStatusContact)

module.exports = router;
