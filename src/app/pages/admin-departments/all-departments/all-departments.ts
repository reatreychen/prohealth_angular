import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentService } from '../../../../services/department.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { getImageUrl } from '../../../utils/url.helper';

@Component({
    selector: 'app-all-departments-admin',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-departments.html',
    styleUrls: ['./all-departments.css']
})
export class AllDepartmentsAdminComponent implements OnInit {
    departments: any[] = [];
    isLoading = false;

    constructor(private departmentService: DepartmentService, private router: Router) { }

    ngOnInit(): void {
        this.fetchDepartments();
    }

    fetchDepartments(): void {
        this.isLoading = true;
        this.departmentService.getDepartments().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.departments = Array.isArray(response) ? response : response.data || [];
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Error fetching departments:', error);
                Swal.fire('Error', 'Failed to fetch departments', 'error');
            }
        });
    }

    deleteDepartment(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.departmentService.deleteDepartment(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Department has been deleted.', 'success');
                        this.fetchDepartments();
                    },
                    error: (error: any) => {
                        console.error('Delete error:', error);
                        Swal.fire('Error', 'Failed to delete department', 'error');
                    }
                });
            }
        });
    }

    editDepartment(id: string): void {
        this.router.navigate(['/admin/departments/edit', id]);
    }

    getImageUrl(images: any[] | string | undefined | null): string {
        return getImageUrl(images, 'assets/images/default-department.png');
    }
}
