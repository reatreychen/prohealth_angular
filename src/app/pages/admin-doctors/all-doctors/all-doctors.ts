import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { DoctorService } from '../../../../services/doctor.service';
import Swal from 'sweetalert2';
import { getImageUrl } from '../../../utils/url.helper';

@Component({
    selector: 'app-all-doctors',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-doctors.html',
    styleUrls: ['./all-doctors.css']
})
export class AllDoctorsComponent implements OnInit {
    doctors: any[] = [];
    isLoading = false;

    constructor(
        private doctorService: DoctorService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchDoctors();
    }

    fetchDoctors(): void {
        this.isLoading = true;
        this.doctorService.getDoctors().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.doctors = response.data || [];
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Fetch doctors error:', error);
                Swal.fire('Error', 'Failed to fetch doctors', 'error');
            }
        });
    }

    deleteDoctor(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.doctorService.deleteDoctor(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Doctor has been deleted.', 'success');
                        this.fetchDoctors();
                    },
                    error: (error: any) => {
                        console.error('Delete doctor error:', error);
                        Swal.fire('Error', 'Failed to delete doctor', 'error');
                    }
                });
            }
        });
    }

    editDoctor(id: string): void {
        this.router.navigate(['/admin/doctors/edit', id]);
    }

    getImageUrl(images: string[]): string {
        return getImageUrl(images, 'assets/images/default-doctor.png');
    }
}
