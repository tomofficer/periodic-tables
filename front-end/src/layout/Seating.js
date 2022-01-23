import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { listTables, updateSeatReservation } from '../utils/api';
import ErrorAlert from './ErrorAlert';
import './Seating.css';

const Seating = () => {
  //useHistory, useParams hooks
  const history = useHistory();
  const params = useParams();

  //state variables
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState({});
  const [tables, setTables] = useState([]);

  //useEffect section
  useEffect(() => {
    const abortController = new AbortController();
    setError(null);
    listTables().then(setTables).catch(setError);
    return () => abortController.abort();
  }, []);

  //event and click handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    const tableObj = JSON.parse(formValue);
    updateSeatReservation(tableObj.table_id, params.reservation_id)
      .then((response) => {
        const newTables = tables.map((table) => {
          return table.table_id === response.table_id ? response : table;
        });
        setTables(newTables);
        history.push(`/dashboard`);
      })
      .catch(setError);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  //main render
  if (tables) {
    return (
      <div>
        <ErrorAlert error={error} />

        <h3 className='d-flex m-3 justify-content-center seating__header-text'>
          Seating for reservation ID: {params.reservation_id}
        </h3>

        <div className='seating__text'>
          <form className='form-group' onSubmit={handleSubmit}>
            <label>Table Number:</label>
            <br />
            <select
              className='form-control'
              name='table_id'
              onChange={(e) => setFormValue(e.target.value)}>
              <option value=''>--Please Choose a Table--</option>
              {tables &&
                tables.map((table) => (
                  <option
                    key={table.table_id}
                    value={JSON.stringify(table)}
                    required>
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
            </select>
            <br />
            <div className='d-flex justify-content-around'>
              <button className='seating__btn--submit' type='submit'>
                Submit
              </button>
              <button className='seating-btn--cancel' onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Seating;
