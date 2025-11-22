import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-banner-time-table',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './banner-time-table.html',
  styleUrls: ['./banner-time-table.css'],
})
export class BannerTimeTable {
  background : string = 'assets/background-home.svg';
  banner_time_table: string = 'assets/banner-time-talbe.png';
}
