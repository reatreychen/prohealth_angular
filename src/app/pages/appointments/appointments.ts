import { Component } from '@angular/core';
import {AppointmentsForm} from '../../AppointmentsComponents/appointments-form/appointments-form';
import {BannerAppointments} from '../../AppointmentsComponents/banner-appointments/banner-appointments';

@Component({
  selector: 'app-appointments',
  imports: [AppointmentsForm,BannerAppointments],
  templateUrl: './appointments.html',
  styleUrl: './appointments.css',
})
export class Appointments {

}
