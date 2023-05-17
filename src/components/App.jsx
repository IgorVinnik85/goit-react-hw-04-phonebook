import { useEffect, useState } from 'react';
import { FindContacts } from './FindContacts/FindContacts';
import { FormPhonebook } from './FormPhonebook/FormPhonebook';
import { ContactsPhonebook } from './ContactsPhonebook/ContactsPhonebook';
import StaticContact from '../components/ContactsPhonebook/StaticContact.json';
import { nanoid } from 'nanoid';

export const App = () => {
  const [contacts, setContacts] = useState(StaticContact);
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
    const newContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(newContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const formSubmitHandler = ({ name, number }) => {
    contacts.forEach(element => {
      if (element.name === name) {
        alert(`${name} is alredy in contacts`);
        return;
      }
    });
    const objData = {
      name: name,
      number: number,
      id: nanoid(),
    };

    setContacts([objData, ...contacts]);
  };

  const findName = event => {
    setFilter(event.target.value);
  };

  const filteredName = () => {
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredArray = filteredName();

  return (
    <div
      style={{
        display: 'inline-flex',
        padding: 20,
        flexDirection: 'column',
        border: '2px solid black',
      }}
    >
      <h1>Phonebook</h1>
      <FormPhonebook onSubmit={formSubmitHandler} />
      <FindContacts onInput={findName} value={filter} />
      <h2>Contacts</h2>
      <ContactsPhonebook data={filteredArray} deleteContact={deleteContact} />
    </div>
  );
};
