import { Component } from '@angular/core';
import {HeroAbout} from '../../AboutComponent/hero-about/hero-about';
import {Departments} from '../../AboutComponent/departments/departments';
import {ChooseUs} from '../../AboutComponent/choose-us/choose-us';
import {AboutValue} from '../../AboutComponent/about-value/about-value';
import {ExpertDoctorDetail} from '../../HomeComponents/expert-doctor-detail/expert-doctor-detail';
import {Facilities} from '../../AboutComponent/facilities/facilities';
import {Awards} from '../../AboutComponent/awards/awards';

@Component({
  selector: 'app-about-page',
  imports: [HeroAbout, Departments, ChooseUs,AboutValue,ExpertDoctorDetail, Facilities, Awards],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css',
})
export class AboutPage {

}
