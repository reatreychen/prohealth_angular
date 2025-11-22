import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'tel' | 'select';
  icon: string;
  iconAlt: string;
  iconWidth: string;
  iconHeight: string;
  value?: string;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

@Component({
  selector: 'app-book-appoinment',
  imports: [CommonModule, FormsModule, NgForOf, NgIf],
  templateUrl: './book-appoinment.html',
  styleUrl: './book-appoinment.css',
})
export class BookAppoinment {
  icon_profile = 'assets/icon_profile.svg';
  card = 'assets/card.svg';
  date = 'assets/date.svg';
  menu = 'assets/menu.svg';
  phone = 'assets/phone.svg';
  time = 'assets/time.svg';

  formFields: FormField[] = [
    {
      id: 'name',
      label: 'Name',
      type: 'text',
      icon: 'assets/icon_profile.svg',
      iconAlt: 'icons profile',
      iconWidth: '28px',
      iconHeight: '33px',
      value: 'Chen Reatrey'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      type: 'tel',
      icon: 'assets/phone.svg',
      iconAlt: 'phone',
      iconWidth: '30px',
      iconHeight: '30px',
      value: '(123) 456 - 789'
    },
    {
      id: 'record',
      label: 'Medical Record Number',
      type: 'text',
      icon: 'assets/card.svg',
      iconAlt: 'card',
      iconWidth: '34px',
      iconHeight: '28px',
      value: '123456-7890-0987'
    },
    {
      id: 'reason',
      label: 'Reason for Visit',
      type: 'text',
      icon: 'assets/menu.svg',
      iconAlt: 'menu',
      iconWidth: '30px',
      iconHeight: '30px',
      value: 'Routine Checkup'
    },
    {
      id: 'date',
      label: 'Preferred Date',
      type: 'text',
      icon: 'assets/date.svg',
      iconAlt: 'date',
      iconWidth: '30px',
      iconHeight: '30px',
      value: 'October 30, 2025'
    },
    {
      id: 'time',
      label: 'Preferred Time',
      type: 'select',
      icon: 'assets/time.svg',
      iconAlt: 'time',
      iconWidth: '30px',
      iconHeight: '30px',
      options: [
        { value: '', label: 'Select an option' },
        { value: '9:00 AM', label: '9:00 AM' },
        { value: '11:00 AM', label: '11:00 AM' },
        { value: '2:00 PM', label: '2:00 PM' },
        { value: '4:00 PM', label: '4:00 PM' }
      ]
    }
  ];
}
