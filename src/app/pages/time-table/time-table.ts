import { Component } from '@angular/core';
import {BannerTimeTable} from '../../TimeTableComponents/banner-time-table/banner-time-table';
import {Schedule} from '../../TimeTableComponents/schedule/schedule';
import {BookAppoinment} from '../../HomeComponents/book-appoinment/book-appoinment';

@Component({
  selector: 'app-time-table',
  standalone: true,
  imports: [BannerTimeTable , Schedule, BookAppoinment ],
  templateUrl: './time-table.html',
  styleUrls: ['./time-table.css'],
})
export class TimeTable {

}
