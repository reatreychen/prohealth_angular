import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-banner-find-doctor',
  imports: [
    NgStyle
  ],
  templateUrl: './banner-find-doctor.html',
  styleUrl: './banner-find-doctor.css',
})
export class BannerFindDoctor {
  background : string = 'assets/background-home.svg';
  findDoctor: string = 'assets/find-doctor.png';
}
