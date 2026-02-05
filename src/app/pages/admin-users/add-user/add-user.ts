import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-user',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './add-user.html',
    styleUrls: ['./add-user.css']
})
export class AddUserComponent implements OnInit {
    userForm: FormGroup;
    isEditMode = false;
    userId: string | null = null;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.userForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            mobile: ['', [Validators.pattern('^[0-9]*$')]],
            role: ['USER', [Validators.required]],
            status: ['PENDING', [Validators.required]],
            address_detail: ['']
        });
    }

    ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.isEditMode = true;
            this.userForm.get('password')?.clearValidators();
            this.userForm.get('password')?.updateValueAndValidity();
            this.loadUserData();
        }
    }

    loadUserData(): void {
        if (!this.userId) return;
        this.userService.getUser(this.userId).subscribe({
            next: (user: any) => {
                this.userForm.patchValue({
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role,
                    status: user.status,
                    address_detail: user.address_detail
                });
            },
            error: () => Swal.fire('Error', 'Failed to load user details', 'error')
        });
    }

    onSubmit(): void {
        if (this.userForm.invalid) {
            this.userForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const userData = this.userForm.value;

        // If editing and password is empty, remove it from request
        if (this.isEditMode && !userData.password) {
            delete userData.password;
        }

        const request = this.isEditMode
            ? this.userService.updateUser(this.userId!, userData)
            : this.userService.createUser(userData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                Swal.fire('Success', `User ${this.isEditMode ? 'updated' : 'created'} successfully!`, 'success')
                    .then(() => this.router.navigate(['/admin/users']));
            },
            error: (err) => {
                this.isLoading = false;
                const msg = err.error?.message || 'Something went wrong';
                Swal.fire('Error', Array.isArray(msg) ? msg.join(', ') : msg, 'error');
            }
        });
    }
}
