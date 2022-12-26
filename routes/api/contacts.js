const express = require('express');
// const contacts = require("../../models/contacts");

const router = express.Router();

const ctrl = require("../../controllers/contacts")

const { postValidation, putValidation, patchValidation } = require('../../middlwares/validationMiddleware');


router.get('/', ctrl.getContacts)

router.get('/:contactId', ctrl.getById)

router.post('/', postValidation, ctrl.addContact)

router.delete('/:contactId', ctrl.deleteById)

router.put('/:contactId', putValidation, ctrl.updateById)

router.patch('/:contactId/favorite', patchValidation, ctrl.updateStatusContact)

module.exports = router;
