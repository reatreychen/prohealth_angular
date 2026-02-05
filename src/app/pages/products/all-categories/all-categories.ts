import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-all-categories',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-categories.html',
    styleUrls: ['./all-categories.css']
})
export class AllCategoriesComponent implements OnInit {
    categories: any[] = [];
    isLoading = false;

    constructor(private categoryService: CategoryService, private router: Router) { }

    ngOnInit(): void {
        this.fetchCategories();
    }

    fetchCategories(): void {
        this.isLoading = true;
        this.categoryService.getCategories().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.categories = Array.isArray(response) ? response : response.data || [];
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Error fetching categories:', error);
                Swal.fire('Error', 'Failed to fetch categories', 'error');
            }
        });
    }

    deleteCategory(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "This may affect products in this category!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.categoryService.deleteCategory(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
                        this.fetchCategories();
                    },
                    error: (error: any) => {
                        console.error('Delete error:', error);
                        let errorMessage = 'Failed to delete category';
                        if (error.error?.message) {
                            errorMessage = Array.isArray(error.error.message)
                                ? error.error.message.join(', ')
                                : error.error.message;
                        }
                        Swal.fire('Error', errorMessage, 'error');
                    }
                });
            }
        });
    }

    editCategory(id: string): void {
        this.router.navigate(['/admin/products/categories/edit', id]);
    }
}
