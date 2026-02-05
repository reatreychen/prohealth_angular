import { Component, OnInit } from '@angular/core';
import { NgForOf, NgClass, CommonModule } from '@angular/common';
import { DoctorService } from '../../../services/doctor.service';
import { getImageUrl } from '../../utils/url.helper';

interface Doctor {
  id?: string;
  image: string;
  name: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-doctor-card',
  standalone: true,
  imports: [CommonModule, NgForOf, NgClass],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.css',
})
export class DoctorCard implements OnInit {
  allDoctors: Doctor[] = [];
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  selectedFilter: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  isLoading = false;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.isLoading = true;
    this.doctorService.getDoctors().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const rawDoctors = response.data || [];
        this.allDoctors = rawDoctors.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          title: doc.department?.title || 'General Doctor',
          description: doc.description || 'No description available.',
          category: doc.department?.title || 'All',
          image: this.getImageUrl(doc.image)
        }));
        this.filterDoctors();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching doctors:', err);
      }
    });
  }

  getImageUrl(images: any[] | string | undefined | null): string {
    return getImageUrl(images, 'assets/images/default-doctor.png');
  }

  filterDoctors(category: string = 'All'): void {
    this.selectedFilter = category;
    if (category === 'All') {
      this.filteredDoctors = [...this.allDoctors];
    } else {
      this.filteredDoctors = this.allDoctors.filter(doctor =>
        doctor.category.toLowerCase().includes(category.toLowerCase())
      );
    }
    this.currentPage = 1;
    this.calculatePagination();
    this.updateDisplayedDoctors();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredDoctors.length / this.itemsPerPage);
    if (this.totalPages < 1) this.totalPages = 1;
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateDisplayedDoctors(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.doctors = this.filteredDoctors.slice(startIndex, endIndex);
  }

  getTotalDoctorsCount(): number {
    return this.filteredDoctors.length;
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedDoctors();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedDoctors();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedDoctors();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
