import PropTypes from 'prop-types';

export const Filter = ({ change, value }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        value={value}
        onChange={e => change(e.target.value)}
        type="text"
        name="filter"
        title="filter"
        required
      />
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
};
