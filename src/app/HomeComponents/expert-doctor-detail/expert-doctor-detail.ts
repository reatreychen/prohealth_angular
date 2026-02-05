import { Component, OnInit } from '@angular/core';
import { NgForOf, CommonModule } from '@angular/common';
import { DoctorService } from '../../../services/doctor.service';
import { getImageUrl } from '../../utils/url.helper';

interface Doctor {
  id: string;
  image: string;
  name: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-expert-doctor-detail',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './expert-doctor-detail.html',
  styleUrl: './expert-doctor-detail.css',
})
export class ExpertDoctorDetail implements OnInit {
  doctors: Doctor[] = [];
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
        const rawDoctors = (response.data || []).slice(0, 3); // Just show first 3 on home page
        this.doctors = rawDoctors.map((doc: any) => ({
          id: doc.id,
          name: doc.name,
          title: doc.department?.title || 'General Doctor',
          description: doc.description || 'No description available.',
          image: this.getImageUrl(doc.image)
        }));
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching home page doctors:', err);
      }
    });
  }

  getImageUrl(images: any[] | string | undefined | null): string {
    return getImageUrl(images, 'assets/doctor1.png');
  }
}
