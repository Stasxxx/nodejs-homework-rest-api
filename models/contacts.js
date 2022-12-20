const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsList = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsList);
  return JSON.parse(result);
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === contactId);
  
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId)
  if (index === -1) {
    return null;
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsList, JSON.stringify(contacts, null, 2));
}

const addContact = async ({name, email, phone}) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsList, JSON.stringify(contacts, null, 2));
  return newContact;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  let filteredContact = null;
  const putContact = {
    id: contactId,
    name: body.name,
    email: body.email,
    phone: body.phone
  };

  contacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = body.name;
      contact.email = body.email;
      contact.phone = body.phone;
      filteredContact = contact.id;
    };
  });
  
  if (filteredContact !== null) {
    return putContact;
  };
  return filteredContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
