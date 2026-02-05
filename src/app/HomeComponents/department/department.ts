import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import { DepartmentService } from '../../../services/department.service';
import { getApiUrl } from '../../utils/url.helper';

interface DepartmentItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  isFirst?: boolean;
}

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [NgForOf, NgIf, CommonModule],
  templateUrl: './department.html',
  styleUrl: './department.css',
})
export class Department implements OnInit {
  departments: DepartmentItem[] = [];
  isLoading = false;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.fetchDepartments();
  }

  fetchDepartments(): void {
    this.isLoading = true;
    this.departmentService.getDepartments().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const rawData = response.data || [];
        this.departments = rawData.map((dept: any, index: number) => ({
          id: dept.id,
          title: dept.title,
          description: dept.description || 'This department provides immediate medical care to patients with acute illnesses or injuries that require immediate attention.',
          icon: this.getImageUrl(dept.image, dept.title),
          isFirst: index === 0
        }));
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching departments:', err);
      }
    });
  }

  getImageUrl(images: any[] | string | undefined | null, title: string): string {
    const url = getApiUrl(Array.isArray(images) ? images[0] : images);
    return url || this.getIconForDepartment(title);
  }

  getIconForDepartment(title: string): string {
    const t = title.toLowerCase();
    if (t.includes('emergency')) return 'assets/emer.svg';
    if (t.includes('pediatric')) return 'assets/department.svg';
    if (t.includes('obstetric') || t.includes('gynecology')) return 'assets/obs.svg';
    if (t.includes('cardiology')) return 'assets/heart.svg';
    if (t.includes('neurology')) return 'assets/neuro.svg';
    if (t.includes('psychiatry')) return 'assets/brain.svg';
    return 'assets/department.svg'; // default
  }
}
