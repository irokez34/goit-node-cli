const { program } = require("commander");
const Contacts = require("./contacts");

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();
      return contacts;

    case "get":
      const contact = await Contacts.getContactById(id);
      return contact;
    // ... id

    case "add":
      const newContact = await Contacts.addContact(name, email, phone);
      return newContact;
    // ... name email phone

    case "remove":
      const removedContact = await Contacts.removeContact(id);
      return removedContact;
    // ... id

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const options = program.opts();
invokeAction(options).then(console.log).catch(console.error);
