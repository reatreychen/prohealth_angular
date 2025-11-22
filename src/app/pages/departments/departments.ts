import { Component } from '@angular/core';
import {HeroAbout} from '../../AboutComponent/hero-about/hero-about';
import {Department} from '../../HomeComponents/department/department';

@Component({
  selector: 'app-departments',
  imports: [HeroAbout ,Department],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {

}
