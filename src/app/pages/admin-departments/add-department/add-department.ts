import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from '../../../../services/department.service';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../../utils/url.helper';

@Component({
    selector: 'app-add-department',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './add-department.html',
    styleUrls: ['./add-department.css']
})
export class AddDepartmentComponent implements OnInit {
    departmentForm: FormGroup;
    isLoading = false;
    isEditMode = false;
    departmentId: string | null = null;
    selectedFiles: File[] = [];
    imagePreviews: string[] = [];

    constructor(
        private fb: FormBuilder,
        private departmentService: DepartmentService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.departmentForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required]]
        });
    }

    ngOnInit(): void {
        this.departmentId = this.route.snapshot.paramMap.get('id');
        if (this.departmentId) {
            this.isEditMode = true;
            this.fetchDepartment(this.departmentId);
        }
    }

    fetchDepartment(id: string): void {
        this.isLoading = true;
        this.departmentService.getDepartment(id).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const dept = response.data || response;
                this.departmentForm.patchValue({
                    title: dept.title,
                    description: dept.description
                });
                if (dept.image) {
                    const images = Array.isArray(dept.image) ? dept.image : [dept.image];
                    this.imagePreviews = images.map((img: string) => getApiUrl(img));
                }
            },
            error: (error: any) => {
                this.isLoading = false;
                Swal.fire('Error', 'Failed to load department', 'error');
            }
        });
    }

    onFileSelected(event: any): void {
        const files = event.target.files;
        if (files && files.length > 0) {
            this.selectedFiles = Array.from(files);
            this.imagePreviews = [];

            this.selectedFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.imagePreviews.push(e.target.result);
                };
                reader.readAsDataURL(file);
            });
        }
    }

    onSubmit(): void {
        if (this.departmentForm.invalid) {
            this.departmentForm.markAllAsTouched();
            Swal.fire('Form Invalid', 'Please fill all required fields', 'warning');
            return;
        }

        this.isLoading = true;

        const formData = new FormData();
        formData.append('title', this.departmentForm.get('title')?.value);
        formData.append('description', this.departmentForm.get('description')?.value);

        this.selectedFiles.forEach(file => {
            formData.append('images', file);
        });

        const request = this.isEditMode
            ? this.departmentService.updateDepartment(this.departmentId!, formData)
            : this.departmentService.createDepartment(formData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                Swal.fire('Success', `Department ${this.isEditMode ? 'updated' : 'created'}!`, 'success')
                    .then(() => this.router.navigate(['/admin/departments']));
            },
            error: (error: any) => {
                this.isLoading = false;
                let errorMessage = 'Failed to save department';
                if (error.error?.message) {
                    errorMessage = Array.isArray(error.error.message)
                        ? error.error.message.join(', ')
                        : error.error.message;
                }
                Swal.fire('Error', errorMessage, 'error');
            }
        });
    }

    onCancel(): void {
        this.router.navigate(['/admin/departments']);
    }
}
