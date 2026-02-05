import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { DoctorService } from '../../../../services/doctor.service';
import { DepartmentService } from '../../../../services/department.service';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../../utils/url.helper';

@Component({
    selector: 'app-add-doctor',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './add-doctor.html',
    styleUrls: ['./add-doctor.css']
})
export class AddDoctorComponent implements OnInit {
    doctorForm: FormGroup;
    isEditMode = false;
    doctorId: string | null = null;
    isLoading = false;
    departments: any[] = [];
    selectedFiles: File[] = [];
    imagePreviews: string[] = [];

    constructor(
        private fb: FormBuilder,
        private doctorService: DoctorService,
        private departmentService: DepartmentService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.doctorForm = this.fb.group({
            name: ['', [Validators.required]],
            departmentId: ['', [Validators.required]],
            description: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.fetchDepartments();
        this.doctorId = this.route.snapshot.paramMap.get('id');
        if (this.doctorId) {
            this.isEditMode = true;
            this.loadDoctorData();
        }
    }

    fetchDepartments(): void {
        this.departmentService.getDepartments().subscribe({
            next: (res: any) => {
                this.departments = res.data || [];
            }
        });
    }

    loadDoctorData(): void {
        if (!this.doctorId) return;
        this.doctorService.getDoctor(this.doctorId).subscribe({
            next: (response: any) => {
                const doctor = response.data;
                this.doctorForm.patchValue({
                    name: doctor.name,
                    departmentId: doctor.department?.id,
                    description: doctor.description
                });
                if (doctor.image && doctor.image.length > 0) {
                    this.imagePreviews = doctor.image.map((img: string) => getApiUrl(img));
                }
            },
            error: () => Swal.fire('Error', 'Failed to load doctor details', 'error')
        });
    }

    onFileSelected(event: any): void {
        const files = event.target.files;
        if (files) {
            for (let file of files) {
                this.selectedFiles.push(file);
                const reader = new FileReader();
                reader.onload = (e: any) => this.imagePreviews.push(e.target.result);
                reader.readAsDataURL(file);
            }
        }
    }

    removeImage(index: number): void {
        this.imagePreviews.splice(index, 1);
        // Note: To properly handle file removal during upload, we would need to track which previews 
        // belong to which files. For simplicity, this removes from preview list.
    }

    onSubmit(): void {
        if (this.doctorForm.invalid) {
            this.doctorForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const formData = new FormData();
        formData.append('name', this.doctorForm.get('name')?.value);
        formData.append('departmentId', this.doctorForm.get('departmentId')?.value);
        formData.append('description', this.doctorForm.get('description')?.value);

        this.selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        const request = this.isEditMode
            ? this.doctorService.updateDoctor(this.doctorId!, formData)
            : this.doctorService.createDoctor(formData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                Swal.fire('Success', `Doctor ${this.isEditMode ? 'updated' : 'created'} successfully!`, 'success')
                    .then(() => this.router.navigate(['/admin/doctors']));
            },
            error: (err) => {
                this.isLoading = false;
                const msg = err.error?.message || 'Something went wrong';
                Swal.fire('Error', Array.isArray(msg) ? msg.join(', ') : msg, 'error');
            }
        });
    }
}
