import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import NotFound from './NotFound';
import NewReservation from './NewReservation';
import NewTable from './NewTable';
import Seating from './Seating';
import Search from './Search';
import EditReservation from './EditReservation';

const Routes = () => {
  return (
    <Switch>
      <Route exact={true} path='/'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact path='/reservations'>
        <Redirect to={'/dashboard'} />
      </Route>
      <Route exact path='/reservations/new'>
        <NewReservation />
      </Route>
      <Route path='/reservations/:reservation_id/seat'>
        <Seating />
      </Route>
      <Route path='/reservations/:reservation_id/edit'>
        <EditReservation />
      </Route>
      <Route path='/tables/new'>
        <NewTable />
      </Route>
      <Route path='/dashboard'>
        <Dashboard />
      </Route>
      <Route path='/dashboard/:date'>
        <Dashboard />
      </Route>
      <Route path='/search'>
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
