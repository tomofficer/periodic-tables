import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ErrorAlert from '../layout/ErrorAlert';
import {
  deleteReservationId,
  deleteTable,
  updateReservationStatus,
} from '../utils/api';
import './Tables.css';

const Tables = ({ table }) => {
  //useHistory hook
  const history = useHistory();

  //state variables
  const [error, setError] = useState(null);
  const [currentTable, setCurrentTable] = useState(table);
  const [tableStatus, setTableStatus] = useState('Free');

  //useEffect section
  useEffect(() => {
    if (currentTable.reservation_id) {
      setTableStatus(
        `Occupied by reservation ID: ${currentTable.reservation_id}`
      );
    } else {
      setTableStatus('Free');
    }
  }, [currentTable]);

  //event and click handlers
  const handleFinish = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      'Is this table ready to seat new guests? This cannot be undone.'
    );
    if (confirmBox === true) {
      updateReservationStatus(
        { status: 'finished' },
        currentTable.reservation_id
      ).catch(setError);
      deleteReservationId(currentTable.table_id)
        .then((response) => {
          setCurrentTable(response);
          history.go(0);
        })
        .catch(setError);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      'Are you sure you want to cancel this reservation? This cannot be undone.'
    );
    if (confirmBox === true) {
      updateReservationStatus(
        { status: 'finished' },
        currentTable.reservation_id
      ).catch(setError);
      deleteReservationId(currentTable.table_id)
        .then((response) => {
          setCurrentTable(response);
          history.go(0);
        })
        .catch(setError);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setError(null);
    const confirmBox = window.confirm(
      'Are you sure you want to delete this table? This cannot be undone.'
    );
    if (confirmBox === true) {
      deleteTable(currentTable.table_id).catch(setError);
      history.go(0);
    }
  };

  //main render
  return (
    <div className='card text-center tables__cards'>
      <ErrorAlert error={error} />
      <div className='card-body'>
        <p className='card-text'>Table Name: {currentTable.table_name}</p>
        <p className='card-text'>Table Capacity: {currentTable.capacity}</p>
        <p
          className='card-text'
          data-table-id-status={`${currentTable.table_id}`}>
          {tableStatus}
        </p>
        <div
          className='d-flex justify-content-center'
          style={{ paddingBottom: '15px' }}>
          {tableStatus === 'Free' ? (
            <div></div>
          ) : (
            <div>
              <button
                className='tables__btn--finish'
                data-table-id-finish={currentTable.table_id}
                onClick={handleFinish}>
                Finish
              </button>{' '}
              <button className='tables__btn--cancel' onClick={handleCancel}>
                Cancel
              </button>
            </div>
          )}
        </div>
        <button className='tables__btn-delete' onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Tables;
