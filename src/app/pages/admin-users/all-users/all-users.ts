import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-all-users',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-users.html',
    styleUrls: ['./all-users.css']
})
export class AllUsersComponent implements OnInit {
    users: any[] = [];
    isLoading = false;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchUsers();
    }

    fetchUsers(): void {
        this.isLoading = true;
        this.userService.getUsers().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.users = Array.isArray(response) ? response : response.data || [];
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Fetch users error:', error);
                Swal.fire('Error', 'Failed to fetch users', 'error');
            }
        });
    }

    deleteUser(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete user!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.userService.deleteUser(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'User has been removed.', 'success');
                        this.fetchUsers();
                    },
                    error: (error: any) => {
                        console.error('Delete user error:', error);
                        Swal.fire('Error', 'Failed to delete user', 'error');
                    }
                });
            }
        });
    }

    editUser(id: string): void {
        this.router.navigate(['/admin/users/edit', id]);
    }

    getRoleBadgeClass(role: string): string {
        switch (role?.toUpperCase()) {
            case 'ADMIN': return 'bg-purple-100 text-purple-700';
            case 'USER': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    getStatusBadgeClass(status: string): string {
        switch (status?.toUpperCase()) {
            case 'PAID': return 'bg-green-100 text-green-700';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            case 'FAILED': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }
}
