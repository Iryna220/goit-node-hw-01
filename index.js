const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await listContacts();
      return console.table(contactsList);
      break;

    case "get":
      const contactsById = await getContactById(id);
      return console.log(contactsById);
      break;

    case "add":
      const addContacts = await addContact(name, email, phone);
      return console.log(addContacts);
      break;

    case "remove":
      const removeContacts = await removeContact(id);
      return console.log(removeContacts);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
