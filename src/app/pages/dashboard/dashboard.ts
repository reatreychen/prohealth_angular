import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { ProductService } from '../../../services/product.service';
import { DoctorService } from '../../../services/doctor.service';
import { DepartmentService } from '../../../services/department.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {

  stats = [
    { label: 'Total Posts', value: 0, icon: 'posts', color: 'bg-blue-500' },
    { label: 'Total Users', value: 0, icon: 'users', color: 'bg-green-500' },
    { label: 'Total Products', value: 0, icon: 'products', color: 'bg-gray-500' },
    { label: 'Total Doctors', value: 0, icon: 'doctors', color: 'bg-sky-400' },
    { label: 'Total Department', value: 0, icon: 'departments', color: 'bg-sky-400' },
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

  constructor(
    private postService: PostService,
    private userService: UserService,
    private productService: ProductService,
    private doctorService: DoctorService,
    private departmentService: DepartmentService
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    // Only fetching data for endpoints that are publicly accessible or where adding auth headers works easily
    // Comments, subscribers, form responses are likely static for now based on the requested UI updates.

    // Instead of waiting for all with forkJoin which might fail if one fails, we fetch individually

    this.postService.getPosts().subscribe({
      next: (res: any) => {
        if (res.data) this.stats[0].value = res.data.length;
      },
      error: (err) => console.error('Failed to fetch posts', err)
    });

    this.userService.getUsers().subscribe({
      next: (res: any) => {
        if (res.data) this.stats[1].value = res.data.length;
      },
      error: (err) => console.error('Failed to fetch users', err)
    });

    this.productService.getProducts().subscribe({
      next: (res: any) => {
        if (res.data) this.stats[2].value = res.data.length;
      },
      error: (err) => console.error('Failed to fetch products', err)
    });

    this.doctorService.getDoctors().subscribe({
      next: (res: any) => {
        if (res.data) this.stats[3].value = res.data.length;
      },
      error: (err) => console.error('Failed to fetch doctors', err)
    });

    this.departmentService.getDepartments().subscribe({
      next: (res: any) => {
        if (res.data) this.stats[4].value = res.data.length;
      },
      error: (err) => console.error('Failed to fetch departments', err)
    });
  }
}

