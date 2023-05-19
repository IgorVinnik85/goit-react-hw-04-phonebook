import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './FormPhonebook.module.css';
import { nanoid } from 'nanoid';

export const FormPhonebook = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  let nameInputId = nanoid();
  let numberInputId = nanoid();

  const handleInputChange = event => {
    // console.log(event.currentTarget.value);
    // const { name, value } = event.currentTarget;
    // this.setState({ [name]: value });
    if (event.currentTarget.name === 'name') {
      setName(event.currentTarget.value);
    }
    if (event.currentTarget.name === 'number') {
      setNumber(event.currentTarget.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();

    //  onSubmit(this.state);
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
    // this.setState({ name: '', number: '' });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.form} htmlFor={nameInputId}>
        Name
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={nameInputId}
        />
      </label>
      <label className={css.form} htmlFor={numberInputId}>
        Number
        <input
          type="tel"
          value={number}
          onChange={handleInputChange}
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          id={numberInputId}
        />
      </label>

      <button className={css.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

FormPhonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
