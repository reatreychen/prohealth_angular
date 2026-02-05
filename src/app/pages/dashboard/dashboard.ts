import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent { // Matches the component layout in pages/dashboard if generated

  stats = [
    { label: 'Total Posts', value: 11, icon: 'posts', color: 'bg-blue-500' },
    { label: 'Total Users', value: 5, icon: 'users', color: 'bg-green-500' },
    { label: 'Total Products', value: 11, icon: 'products', color: 'bg-gray-500' },
    { label: 'Total Doctors', value: 12, icon: 'doctors', color: 'bg-sky-400' }, // Light blue
    { label: 'Total Department', value: 8, icon: 'departments', color: 'bg-sky-400' },
    { label: 'Total Comments', value: 5, icon: 'comments', color: 'bg-gray-500' },
    { label: 'Total Subscriber', value: 11, icon: 'subscribers', color: 'bg-green-500' },
    { label: 'Total Form Responses', value: 315, icon: 'form', color: 'bg-blue-600' },
  ];

  subscribers = [
    { email: 'reenapk1986@gmail.com', avatar: 'R' },
    { email: 'keyur@gmail.com', avatar: 'K' },
    { email: 'admin@gmail.com', avatar: 'A' },
    { email: 'test@gmail.com', avatar: 'T' },
    { email: 'user@gmail.com', avatar: 'U' }
  ];

  comments = [
    {
      name: 'keyur',
      email: 'keyur@gmail.com',
      content: 'This blog provided exceptional information on the anxiety disorder and also provided a good techniques to manage them. This was really helpful.',
      status: 'NOT APPROVED',
      avatar: 'K'
    }
  ];
}
