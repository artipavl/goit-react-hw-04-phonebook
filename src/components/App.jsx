import { React, Component } from 'react';
import { nanoid } from 'nanoid';

import { Section } from 'components/Section/Section';
import { Phonebook } from 'components/Phonebook/Phonebook';
import { ContactList } from 'components/Contacts/ContactList';
import { Filter } from 'components/Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (JSON.parse(window.localStorage.getItem('contacts'))) {
      const contacts = JSON.parse(window.localStorage.getItem('contacts'));
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevP, prevS) {
    if (prevS.contacts !== this.state.contacts) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = (name, number) => {
    this.setState(({ contacts }) => {
      return {
        contacts: [...contacts, { id: nanoid(), name, number }],
      };
    });
  };

  deleteContact = id => {
    const { contacts } = this.state;
    let indexEl;
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === id) {
        indexEl = i;
      }
    }

    this.setState(state => {
      const stateRed = [...state.contacts];
      stateRed.splice(indexEl, 1);
      return {
        contacts: stateRed,
      };
    });
  };

  changeFilter = e => {
    const input = e.target;
    this.setState({ filter: input.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const contactsFil = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <div>
        <Section title="Phonebook">
          <Phonebook addContact={this.addContact} contacts={contacts} />
        </Section>
        <Section title="Contacts">
          <Filter change={this.changeFilter} value={filter} />
          <ContactList
            contacts={contactsFil}
            deleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}

// { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
// { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
// { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
// { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
