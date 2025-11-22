import { Routes } from '@angular/router';
import { HomeComponent } from './pages/homePage/home';
import { AboutPage } from './pages/about-page/about-page';
import {FindDoctor} from './pages/find-doctor/find-doctor';
import {Blogs} from './pages/blogs/blogs';
import {Appointments} from './pages/appointments/appointments';
import {Departments} from './pages/departments/departments';
import {TimeTable} from './pages/time-table/time-table';
import {Login} from './pages/login/login'
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'about',
        component: AboutPage,
    },
  {
    path: 'find-doctor',
    component: FindDoctor,
  },
  {
    path: 'blog',
    component: Blogs
  },
  {
    path: 'appointments',
    component: Appointments
  },
  {
    path: 'department',
    component: Departments
  },
  {
    path: 'timeTable',
    component: TimeTable,
  },
  {
    path: 'login',
    component: Login 
  }
];
