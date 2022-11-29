import PropTypes from 'prop-types';
import css from 'components/Contacts/ContactList.module.css';

import { ContactItem } from "components/Contacts/ContactItem";

export const ContactList = ({ contacts, deleteContact }) => {
  return (
    <ul className={css.list}>
      {contacts.map(contact => 
          <ContactItem key={contact.id} contact={contact} deleteContact={deleteContact} />
       )}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
};
