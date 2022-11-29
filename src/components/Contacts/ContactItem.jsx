import PropTypes from 'prop-types';
import css from 'components/Contacts/ContactList.module.css';

export const ContactItem = ({ contact, deleteContact }) => {
    const { name, number, id } = contact;
    return (
        <li className={css.item}>
            {name}: {number}
            <button
              type="button"
              onClick={() => deleteContact(id)}
              className={css.button}
            >
              Delete
            </button>
          </li>
    )
}

ContactItem.propTypes = {
  contact: PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired,
  deleteContact: PropTypes.func.isRequired,
};