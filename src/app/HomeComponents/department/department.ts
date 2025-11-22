import { Component } from '@angular/core';
import { NgForOf, NgIf, NgClass } from '@angular/common';

interface DepartmentItem {
  id: string;
  name: string;
  nameLines: string[];
  icon: string;
  iconAlt: string;
  iconWidth: string;
  iconHeight: string;
  isEmpty?: boolean;
}

@Component({
  selector: 'app-department',
  imports: [NgForOf, NgIf, NgClass],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department {
  brain: string = 'assets/brain.svg';
  department: string = 'assets/department.svg';
  emergency: string = 'assets/emer.svg';
  heart: string = 'assets/heart.svg';
  neuro: string = 'assets/neuro.svg';
  obs: string = 'assets/obs.svg';

  departments: DepartmentItem[] = [
    {
      id: 'emergency',
      name: 'Emergency',
      nameLines: ['Emergency', 'Department'],
      icon: 'assets/emer.svg',
      iconAlt: 'emergency',
      iconWidth: '70px',
      iconHeight: '66px',
      isEmpty: false
    },
    {
      id: 'pediatric',
      name: 'Pediatric',
      nameLines: ['Pediatric', 'Department'],
      icon: 'assets/department.svg',
      iconAlt: 'department',
      iconWidth: '89px',
      iconHeight: '73px',
      isEmpty: false
    },
    {
      id: 'empty1',
      name: '',
      nameLines: [],
      icon: '',
      iconAlt: '',
      iconWidth: '',
      iconHeight: '',
      isEmpty: true
    },
    {
      id: 'empty2',
      name: '',
      nameLines: [],
      icon: '',
      iconAlt: '',
      iconWidth: '',
      iconHeight: '',
      isEmpty: true
    },
    {
      id: 'empty3',
      name: '',
      nameLines: [],
      icon: '',
      iconAlt: '',
      iconWidth: '',
      iconHeight: '',
      isEmpty: true
    },
    {
      id: 'obstetric',
      name: 'Obstetric and Gynecology',
      nameLines: ['Obstertric and', 'Gynecology', 'Department'],
      icon: 'assets/obs.svg',
      iconAlt: 'obs',
      iconWidth: '73px',
      iconHeight: '73px',
      isEmpty: false
    },
    {
      id: 'cardiology',
      name: 'Cardiology',
      nameLines: ['Cardiology', 'Department'],
      icon: 'assets/heart.svg',
      iconAlt: 'heart',
      iconWidth: '60px',
      iconHeight: '72px',
      isEmpty: false
    },
    {
      id: 'empty4',
      name: '',
      nameLines: [],
      icon: '',
      iconAlt: '',
      iconWidth: '',
      iconHeight: '',
      isEmpty: true
    },
    {
      id: 'empty5',
      name: '',
      nameLines: [],
      icon: '',
      iconAlt: '',
      iconWidth: '',
      iconHeight: '',
      isEmpty: true
    },
    {
      id: 'empty6',
      name: '',
      nameLines: [],
      icon: '',
      iconAlt: '',
      iconWidth: '',
      iconHeight: '',
      isEmpty: true
    },
    {
      id: 'psychiatry',
      name: 'Psychiatry',
      nameLines: ['Psychiatry', 'Department'],
      icon: 'assets/brain.svg',
      iconAlt: 'brain',
      iconWidth: '63px',
      iconHeight: '70px',
      isEmpty: false
    },
    {
      id: 'neurology',
      name: 'Neurology',
      nameLines: ['Neurology', 'Department'],
      icon: 'assets/neuro.svg',
      iconAlt: 'neuro',
      iconWidth: '70px',
      iconHeight: '72px',
      isEmpty: false
    }
  ];
}
