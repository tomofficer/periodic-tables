import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import { updateReservationStatus } from '../utils/api';
import './Reservations.css';

const Reservations = ({ reservation }) => {
  //useHistory hook
  const history = useHistory();

  //state variables
  const [currentReservation, setCurrentReservation] = useState(reservation);
  const [showSeat, setShowSeat] = useState(false);
  const [error, setError] = useState(null);

  //useEffect section
  useEffect(() => {
    if (
      currentReservation.status === 'booked' ||
      currentReservation.status === null
    ) {
      setShowSeat(true);
    }
  }, [currentReservation]);

  //event and click handlers
  const handleSeat = (e) => {
    e.preventDefault();
    setError(null);
    setShowSeat(false);
    updateReservationStatus(
      { status: 'seated' },
      currentReservation.reservation_id
    )
      .then((response) => {
        setCurrentReservation(response);
        history.push(`/reservations/${currentReservation.reservation_id}/seat`);
      })
      .catch(setError);
  };

  const handleCancelRes = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      'Do you want to cancel this reservation? This cannot be undone.'
    );
    if (confirmBox === true) {
      updateReservationStatus(
        { status: 'cancelled' },
        currentReservation.reservation_id
      )
        .then((response) => {
          setCurrentReservation(response);
          history.go(0);
        })
        .catch(setError);
    }
  };

  //main render
  return (
    <div className='card text-left card-background reservations__text'>
      <ErrorAlert error={error} />
      <div className=' reservations__card'>
        <h4 className='card-title text-center'>
          {currentReservation.reservation_time}
        </h4>
        <p className='card-text text-center'>
          {currentReservation.reservation_date}
        </p>

        <p className='reservations__card-detail-text card-text'>
          {currentReservation.first_name} {currentReservation.last_name}
        </p>
        <p className='card-text'>{currentReservation.mobile_number}</p>
        <p className='card-text'>Party Size: {currentReservation.people}</p>
        <p
          className='text-center boldtext'
          data-reservation-id-status={currentReservation.reservation_id}>
          {currentReservation.status ? currentReservation.status : 'booked'}
        </p>

        <div className='d-flex justify-content-center mb-1'>
          {showSeat ? (
            <a
              href={`/reservations/${currentReservation.reservation_id}/seat`}
              onClick={handleSeat}
              className='card-link reservations__btn--seat'>
              Seat
            </a>
          ) : (
            <div></div>
          )}
        </div>

        <div className='d-flex justify-content-center btn-group'>
          <a
            href={`/reservations/${currentReservation.reservation_id}/edit`}
            className='reservations__btn--edit'>
            Edit
          </a>
          <button
            data-reservation-id-cancel={currentReservation.reservation_id}
            onClick={handleCancelRes}
            className='reservations__btn--cancel'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reservations;
