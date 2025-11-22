import { Component } from '@angular/core';
import { BannerComponent} from '../../HomeComponents/banner/banner';
import { BookAppoinment } from '../../HomeComponents/book-appoinment/book-appoinment';
import {Partner} from '../../HomeComponents/partner/partner'
import {About} from '../../HomeComponents/about/about'
import { OurValue } from '../../HomeComponents/our-value/our-value';
import { Department } from '../../HomeComponents/department/department';
import { ExpertDoctorDetail } from '../../HomeComponents/expert-doctor-detail/expert-doctor-detail';
import { BlogPost } from '../../HomeComponents/blog-post/blog-post';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BannerComponent , BookAppoinment, Partner,About,OurValue, Department, ExpertDoctorDetail, BlogPost],
  templateUrl: './home.html',
})
export class HomeComponent {

}
