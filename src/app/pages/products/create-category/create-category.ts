import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-category',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-category.html',
    styleUrls: ['./create-category.css']
})
export class CreateCategoryComponent implements OnInit {
    categoryForm: FormGroup;
    isLoading = false;
    isEditMode = false;
    categoryId: string | null = null;

    constructor(
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.categoryForm = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    ngOnInit(): void {
        this.categoryId = this.route.snapshot.paramMap.get('id');
        if (this.categoryId) {
            this.isEditMode = true;
            this.fetchCategory(this.categoryId);
        }
    }

    fetchCategory(id: string): void {
        this.isLoading = true;
        this.categoryService.getCategory(id).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const category = response.data || response;
                this.categoryForm.patchValue({ name: category.name });
            },
            error: () => {
                this.isLoading = false;
                Swal.fire('Error', 'Failed to load category', 'error');
            }
        });
    }

    onSubmit(): void {
        if (this.categoryForm.invalid) {
            this.categoryForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const request = this.isEditMode
            ? this.categoryService.updateCategory(this.categoryId!, this.categoryForm.value)
            : this.categoryService.createCategory(this.categoryForm.value);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                Swal.fire('Success', `Category ${this.isEditMode ? 'updated' : 'created'}!`, 'success')
                    .then(() => this.router.navigate(['/admin/products/categories']));
            },
            error: (error: any) => {
                this.isLoading = false;
                let errorMessage = 'Failed to save category';
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
        this.router.navigate(['/admin/products/categories']);
    }
}
