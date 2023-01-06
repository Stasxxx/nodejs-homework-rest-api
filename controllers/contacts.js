const {Contacts} = require("../models/contactsSchema")

const { HttpError, ctrlWrapper } = require("../helpers");

const getContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;
    if (favorite) {
        const contactList = await Contacts.find({ owner, $or: [{ favorite }] }, "-createdAt, -updatedAt", { skip, limit }).populate("owner", "email subscription");
        return res.json(contactList)
    }
    const contactList = await Contacts.find({owner}, "-createdAt, -updatedAt", {skip, limit}).populate("owner", "email subscription");
    res.json(contactList);
};

const getById = async (req, res) => {
    const { contactId } = req.params;
    const oneContact = await Contacts.findOne({ _id: contactId });
    if (!oneContact) {
        throw HttpError(404)
    }
    res.json(oneContact);
};

const addContact = async (req, res) => {
    const { _id: owner } = req.user;
    const postContact = await Contacts.create({ ...req.body, owner });
    res.status(201).json(postContact);
};

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const updateContact = await Contacts.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!updateContact) {
        throw HttpError(404)
    };
    res.json(updateContact);
};

const deleteById = async (req, res) => {
    const { contactId } = req.params;
    const deleteContact = await Contacts.findByIdAndRemove({ _id: contactId })
    if (!deleteContact) {
        throw HttpError(404)
    };
    res.json({ message: "contact deleted" });
};

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contacts.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
    if (!result) {
        throw HttpError(404)
    };
    res.json(result);
};

module.exports = {
    getContacts: ctrlWrapper(getContacts),
    getById: ctrlWrapper(getById),
    addContact: ctrlWrapper(addContact),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};