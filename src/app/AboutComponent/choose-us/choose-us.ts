import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Feature {
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  iconWidth: string;
  iconHeight: string;
}

@Component({
  selector: 'app-choose-us',
  imports: [NgForOf],
  templateUrl: './choose-us.html',
  styleUrl: './choose-us.css',
})
export class ChooseUs {
  choose: string = "assets/choose.jpg";
  award: string = "assets/award.svg";
  approach: string = "assets/approch.svg";
  factility: string = "assets/factility.svg";
  service: string = "assets/service.svg";

  features: Feature[] = [
    {
      title: 'Experienced Medical Professionals',
      description: 'Our team includes experienced doctors, nurses, and other healthcare professionals who are dedicated to providing the best possible care to our patients.',
      icon: 'assets/award.svg',
      iconAlt: 'emergency',
      iconWidth: '14px',
      iconHeight: '18px'
    },
    {
      title: 'Comprehensive Services',
      description: 'We offer a wide range of healthcare services, from preventive care to specialized treatment for complex conditions.',
      icon: 'assets/service.svg',
      iconAlt: 'emergency',
      iconWidth: '18px',
      iconHeight: '18px'
    },
    {
      title: 'Patient-centered Approach',
      description: 'We believe in treating each patient as an individual, and we take the time to understand your unique health needs and concerns.',
      icon: 'assets/approch.svg',
      iconAlt: 'approach',
      iconWidth: '18px',
      iconHeight: '18px'
    },
    {
      title: 'State-of-the-art Facilities',
      description: 'Our healthcare center is equipped with the latest technology and equipment to provide our patients with the most advanced care possible.',
      icon: 'assets/factility.svg',
      iconAlt: 'Facilities',
      iconWidth: '18px',
      iconHeight: '18px'
    }
  ];
}
