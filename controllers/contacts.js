const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
        const contactList = await contacts.listContacts(); 
        res.json(contactList);
}

const getById = async (req, res) => {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
        if (!oneContact) {
        throw HttpError(404)
    }
        res.json(oneContact);
}

const addContact = async (req, res) => {
    const postContact = await contacts.newContact(req.body);
        res.status(201).json(postContact);
}

const updateById = async (req, res) => {
    const updateContact = await contacts.updateContact(req.params.contactId, req.body);
        if (!updateContact) {
            throw HttpError(404)
    };
        res.json(updateContact);
}

const deleteById = async (req, res) => {
        const deleteContact = await contacts.removeContact(req.params.contactId)
        if (deleteContact === null) {
            throw HttpError(404)
    };
        res.json({ message: "contact deleted" }); 
}

const updateStatusContact = async (req, res) => {
    const result = await contacts.addStastus(req.params.contactId, req.body)
    console.log(result)
        if (result === null) {
            throw HttpError(404)
    };
    res.json(result);
}

module.exports = {
    getContacts: ctrlWrapper(getContacts),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
}