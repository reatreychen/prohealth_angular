import { Component, OnInit } from '@angular/core';
import { NgForOf, NgClass } from '@angular/common';

interface Doctor {
  image: string;
  name: string;
  title: string;
  description: string;
  category: string;
}

@Component({
  selector: 'app-doctor-card',
  imports: [NgForOf, NgClass],
  templateUrl: './doctor-card.html',
  styleUrl: './doctor-card.css',
})
export class DoctorCard implements OnInit {
  allDoctors: Doctor[] = [
    {
      image: 'assets/doctor1.png',
      name: 'Dr. James Lee, MD',
      title: 'Head of Cardiologist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Cardiology'
    },
    {
      image: 'assets/doctor2.png',
      name: 'Dr. Sarah Johnson, MD',
      title: 'Emergency Medicine Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Emergency'
    },
    {
      image: 'assets/doctor3.png',
      name: 'Dr. Michael Chen, MD',
      title: 'Pediatric Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Pediatric'
    },
    {
      image: 'assets/doctor4.png',
      name: 'Dr. Emily Davis, MD',
      title: 'Psychiatry Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Psychiatry'
    },
    {
      image: 'assets/doctor5.png',
      name: 'Dr. Robert Wilson, MD',
      title: 'Head of Cardiologist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Cardiology'
    },
    {
      image: 'assets/doctor6.png',
      name: 'Dr. Lisa Anderson, MD',
      title: 'Emergency Medicine Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Emergency'
    },
    {
      image: 'assets/doctor7.png',
      name: 'Dr. David Brown, MD',
      title: 'Pediatric Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Pediatric'
    },
    {
      image: 'assets/doctor8.png',
      name: 'Dr. Jennifer Martinez, MD',
      title: 'Psychiatry Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Psychiatry'
    },
    {
      image: 'assets/doctor9.png',
      name: 'Dr. Thomas Taylor, MD',
      title: 'Head of Cardiologist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Cardiology'
    },
    {
      image: 'assets/doctor10.png',
      name: 'Dr. Amanda White, MD',
      title: 'Emergency Medicine Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Emergency'
    },
    {
      image: 'assets/doctor11.png',
      name: 'Dr. Christopher Lee, MD',
      title: 'Pediatric Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Pediatric'
    },
    {
      image: 'assets/doctor12.png',
      name: 'Dr. Jessica Garcia, MD',
      title: 'Psychiatry Specialist',
      description: 'With expertise in managing complex heart conditions and performing advanced cardiac procedures',
      category: 'Psychiatry'
    }
  ];

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  selectedFilter: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  pageNumbers: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.filterDoctors();
  }

  filterDoctors(category: string = 'All'): void {
    this.selectedFilter = category;
    if (category === 'All') {
      this.filteredDoctors = [...this.allDoctors];
    } else {
      this.filteredDoctors = this.allDoctors.filter(doctor => doctor.category === category);
    }
    this.currentPage = 1;
    this.calculatePagination();
    this.updateDisplayedDoctors();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredDoctors.length / this.itemsPerPage);
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
