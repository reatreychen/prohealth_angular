import { Component } from '@angular/core';
import { NgStyle, NgForOf } from '@angular/common';

interface Statistic {
  value: string;
  description: string;
}

@Component({
  selector: 'app-about-value',
  imports: [
    NgStyle,
    NgForOf
  ],
  templateUrl: './about-value.html',
  styleUrl: './about-value.css',
})
export class AboutValue {
  background_about: string = "assets/background-about.jpg";
  
  statistics: Statistic[] = [
    {
      value: '20+',
      description: 'Years of experience'
    },
    {
      value: '95%',
      description: 'Patient satisfaction rating'
    },
    {
      value: '5,000+',
      description: 'Patients served annually'
    },
    {
      value: '10+',
      description: 'Healthcare providers on staff'
    },
    {
      value: '20+',
      description: 'Convenient locations in the area'
    }
  ];
}
