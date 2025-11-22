import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-banner-appointments',
  imports: [
    NgStyle
  ],
  templateUrl: './banner-appointments.html',
  styleUrl: './banner-appointments.css',
})
export class BannerAppointments {
  background : string = 'assets/background-home.svg';
  appointment_banner: string = 'assets/appointment-banner.png';
}
