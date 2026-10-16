import { Routes } from '@angular/router';
import { TripList } from './trip-list/trip-list';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: '',
    component: TripList
  },
  {
    path: 'login',
    component: Login
  }
];