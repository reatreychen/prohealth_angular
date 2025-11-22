import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Doctor {
  id: string;
  image: string;
  name: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-expert-doctor-detail',
  imports: [NgForOf],
  templateUrl: './expert-doctor-detail.html',
  styleUrl: './expert-doctor-detail.css',
})
export class ExpertDoctorDetail {
  doctor1: string = "assets/doctor1.png";
  doctor2: string = "assets/doctor2.png";
  doctor3: string = "assets/doctor3.png";

  doctors: Doctor[] = [
    {
      id: 'doctor1',
      image: 'assets/doctor1.png',
      name: 'Dr. James Lee, MD',
      title: 'Head of Cardiologist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures'
    },
    {
      id: 'doctor2',
      image: 'assets/doctor2.png',
      name: 'Dr. James Lee, MD',
      title: 'Head of Cardiologist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures'
    },
    {
      id: 'doctor3',
      image: 'assets/doctor3.png',
      name: 'Dr. James Lee, MD',
      title: 'Head of Cardiologist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures'
    }
  ];
}
