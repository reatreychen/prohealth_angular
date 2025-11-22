import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-hero-about',
  imports: [NgStyle],
  templateUrl: './hero-about.html',
  styleUrl: './hero-about.css',
})
export class HeroAbout {
  background : string = 'assets/background-home.svg';
  banner_about: string = 'assets/about.png';
}
