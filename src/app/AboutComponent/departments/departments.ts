import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';

interface Department {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  iconWidth: string;
  iconHeight: string;
}

@Component({
  selector: 'app-departments',
  imports: [
    NgForOf
  ],
  templateUrl: './departments.html',
  styleUrl: './departments.css',
})
export class Departments {
  brain: string = 'assets/brain.svg';
  department: string = 'assets/department.svg';
  emergency = 'assets/emer.svg';
  heart: string = 'assets/heart.svg';
  neuro: string = 'assets/neuro.svg';
  obs: string = 'assets/obs.svg';

  departments: Department[] = [
    {
      id: 'diagnostic',
      title: 'Diagnostic testing',
      description: 'Blood tests, imaging studies, and other tests to diagnose health conditions',
      icon: 'assets/emer.svg',
      iconAlt: 'emergency',
      iconWidth: '24px',
      iconHeight: '22px'
    },
    {
      id: 'rehabilitation',
      title: 'Rehabilitation services',
      description: 'Physical therapy, occupational therapy, and other services to help patients recover from injuries',
      icon: 'assets/heart.svg',
      iconAlt: 'heart',
      iconWidth: '24px',
      iconHeight: '28px'
    },
    {
      id: 'preventive',
      title: 'Preventive care',
      description: 'Annual checkups, immunizations, and health screenings care preventive',
      icon: 'assets/department.svg',
      iconAlt: 'department',
      iconWidth: '24px',
      iconHeight: '20px'
    },
    {
      id: 'treatment',
      title: 'Treatment for acute and chronic conditions',
      description: 'Medication management, disease management, and other treatments to improve health outcomes',
      icon: 'assets/neuro.svg',
      iconAlt: 'neuro',
      iconWidth: '24px',
      iconHeight: '24px'
    },
    {
      id: 'mental-health',
      title: 'Mental health services',
      description: 'Counseling, therapy, and other services to help patients manage mental health conditions',
      icon: 'assets/brain.svg',
      iconAlt: 'brain',
      iconWidth: '24px',
      iconHeight: '26px'
    }
  ];
}
