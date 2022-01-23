import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createTable } from '../utils/api';
import ErrorAlert from './ErrorAlert';
import './NewTable.css';

const NewTable = () => {
  //useHistory hook
  const history = useHistory();

  //state variables
  const [error, setError] = useState(null);
  const [capacity, setCapacity] = useState('');
  const [table_name, setTable_name] = useState('');

  //event and click handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const table = {
      table_name,
      capacity,
    };
    createTable(table)
      .then(() => {
        history.push('/dashboard');
      })
      .catch(setError);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  //main render
  return (
    <div>
      <ErrorAlert error={error} />

      <h3 className='d-flex m-3 justify-content-center newtable__header-text'>
        New Table Form
      </h3>

      <div>
        <form className='newtable__text form-group' onSubmit={handleSubmit}>
          <label>Table Name:</label>
          <br />
          <input
            name='table_name'
            type='text'
            required
            onChange={(e) => setTable_name(e.target.value)}
            value={table_name}
            className='form-control'
          />
          <br />
          <label>Table Capacity:</label>
          <br />
          <input
            name='capacity'
            type='number'
            required
            onChange={(e) => setCapacity(e.target.valueAsNumber)}
            value={capacity}
            className='form-control'
          />
          <br />

          <div className='d-flex justify-content-around'>
            <button className='newtable__btn--submit' type='submit'>
              Submit
            </button>
            <button className='newtable__btn--cancel' onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTable;
