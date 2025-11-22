import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { NgStyle } from '@angular/common';
@Component({
  selector: 'app-banner',
  standalone: true,
  templateUrl: './banner.html',
  imports: [NgStyle],
})
export class BannerComponent {
  bannerbackground = '/assets/background-home.svg';
  doctor = '/assets/doctor.png';
  total = '/assets/total.svg';
  heart = '/assets/heart.svg';
  open_hours = '/assets/open_hours.svg';
  profile ='/assets/profile.png'
}
