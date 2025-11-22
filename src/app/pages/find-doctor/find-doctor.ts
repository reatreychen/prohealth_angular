import { Component } from '@angular/core';
import {BannerFindDoctor} from '../../FindDoctorComponents/banner-find-doctor/banner-find-doctor';
import {DoctorCard} from '../../FindDoctorComponents/doctor-card/doctor-card';

@Component({
  selector: 'app-find-doctor',
  imports: [BannerFindDoctor, DoctorCard],
  templateUrl: './find-doctor.html',
  styleUrl: './find-doctor.css',
})
export class FindDoctor {

}
