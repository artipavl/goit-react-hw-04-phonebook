import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Section } from 'components/Section/Section';
import { Phonebook } from 'components/Phonebook/Phonebook';
import { ContactList } from 'components/Contacts/ContactList';
import { Filter } from 'components/Filter/Filter';

export function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(window.localStorage.getItem('contacts'))
      ? JSON.parse(window.localStorage.getItem('contacts'))
      : []
  );
  const [filter, setfilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    setContacts(contacts => [...contacts, { id: nanoid(), name, number }]);
  };

  const deleteContact = id => {
    let indexEl;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === id) {
        indexEl = i;
      }
    }
    setContacts(contacts => {
      const stateRed = [...contacts];
      stateRed.splice(indexEl, 1);
      return stateRed;
    });
  };

  const contactsFil = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  // const contactsFil = useMemo(() => contacts.filter(({ name }) =>
  //     name.toLowerCase().includes(filter.toLowerCase())
  //   )
  // , [contacts, filter]);

  return (
    <div>
      <Section title="Phonebook">
        <Phonebook addContact={addContact} contacts={contacts} />
      </Section>
      <Section title="Contacts">
        <Filter change={setfilter} value={filter} />
        <ContactList contacts={contactsFil} deleteContact={deleteContact} />
      </Section>
    </div>
  );
}

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
