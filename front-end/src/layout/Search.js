import React, { useEffect, useState } from 'react';
import { listReservations } from '../utils/api';
import Reservations from '../dashboard/Reservations';
import './Search.css';

const Search = () => {
  //state variables
  const [showError, setShowError] = useState(false);
  const [reservations, setReservations] = useState(null);
  const [mobile_number, setMobile_number] = useState('');

  //useEffect section
  useEffect(() => {
    if (reservations && reservations.length === 0) {
      setShowError(true);
    }
  }, [reservations]);

  //event and click handlers
  const handleSubmit = (e) => {
    e.preventDefault();
    listReservations({ mobile_number }).then((response) => {
      setReservations(response);
    });
  };

  //main render
  return (
    <div>
      <div>
        {showError && (
          <p className='alert alert-danger'>No reservations found.</p>
        )}
      </div>

      <h3 className='d-flex m-3 justify-content-center search__header-text'>
        Search Form
      </h3>

      <div>
        <form className='search__text form-group' onSubmit={handleSubmit}>
          <input
            name='mobile_number'
            type='text'
            placeholder="Enter a customer's phone number"
            required
            onChange={(e) => setMobile_number(e.target.value)}
            value={mobile_number}
            className='form-control'
          />
          <br />
          <div className='d-flex justify-content-center'>
            <button className='search__btn--find' type='submit'>
              Find
            </button>
          </div>
        </form>
        <div>
          <ul className='list-group list-group-flush'>
            {reservations &&
              reservations.map((res) => (
                <li className='list-group-item' key={res.reservation_id}>
                  <Reservations reservation={res} />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
