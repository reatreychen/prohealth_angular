import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Award {
  name: string;
  image: string;
}

@Component({
  selector: 'app-awards',
  imports: [NgForOf],
  templateUrl: './awards.html',
  styleUrl: './awards.css',
})
export class Awards {
  choose: string = "assets/choose.jpg";
  award: string = "assets/award.svg";
  approach: string = "assets/approch.svg";
  factility: string = "assets/factility.svg";
  service: string = "assets/service.svg";

  awards: Award[] = [
    {
      name: 'Malcolm Baldrige National Quality Award',
      image: 'assets/award.svg'
    },
    {
      name: 'Malcolm Baldrige National Quality Award',
      image: 'assets/award.svg'
    },
    {
      name: 'Malcolm Baldrige National Quality Award',
      image: 'assets/award.svg'
    },
    {
      name: 'Malcolm Baldrige National Quality Award',
      image: 'assets/award.svg'
    }
  ];
}
