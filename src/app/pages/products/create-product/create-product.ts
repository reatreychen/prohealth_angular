import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { CategoryService } from '../../../../services/category.service';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../../utils/url.helper';

@Component({
    selector: 'app-create-product',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './create-product.html',
    styleUrls: ['./create-product.css']
})
export class CreateProductComponent implements OnInit {
    productForm: FormGroup;
    isLoading = false;
    categories: any[] = [];
    imagePreviewUrls: string[] = [];
    selectedFiles: File[] = [];
    isEditMode = false;
    productId: string | null = null;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private categoryService: CategoryService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.productForm = this.fb.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
            price: [0, [Validators.required, Validators.min(0)]],
            discount: [0, [Validators.min(0), Validators.max(100)]],
            stock: [0, [Validators.required, Validators.min(0)]],
            unit: ['', [Validators.required]],
            categoryIds: [[], [Validators.required]],
            public: [true]
        });
    }

    ngOnInit(): void {
        this.fetchCategories();
        this.productId = this.route.snapshot.paramMap.get('id');
        if (this.productId) {
            this.isEditMode = true;
            this.fetchProduct(this.productId);
        }
    }

    fetchCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (response: any) => {
                this.categories = Array.isArray(response) ? response : response.data || [];
            },
            error: (error: any) => console.error('Error fetching categories:', error)
        });
    }

    fetchProduct(id: string): void {
        this.isLoading = true;
        this.productService.getProduct(id).subscribe({
            next: (response: any) => {
                this.isLoading = false;
                const product = response.data || response;
                this.productForm.patchValue({
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    discount: product.discount,
                    stock: product.stock,
                    unit: product.unit,
                    public: product.public,
                    categoryIds: product.categories?.map((c: any) => c.id) || []
                });
                if (product.image && product.image.length > 0) {
                    this.imagePreviewUrls = product.image.map((img: string) => this.getImageUrl(img));
                }
            },
            error: (error: any) => {
                this.isLoading = false;
                Swal.fire('Error', 'Failed to load product', 'error');
            }
        });
    }

    getImageUrl(path: string): string {
        if (path && path.startsWith('data:')) return path; // Keep data URLs as-is
        return getApiUrl(path);
    }

    onImageSelected(event: any): void {
        const files: FileList = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                this.selectedFiles.push(files[i]);
                const reader = new FileReader();
                reader.onload = (e: any) => this.imagePreviewUrls.push(e.target.result);
                reader.readAsDataURL(files[i]);
            }
        }
    }

    removeImage(index: number): void {
        this.imagePreviewUrls.splice(index, 1);
        this.selectedFiles.splice(index, 1);
    }

    onSubmit(): void {
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            Swal.fire('Form Invalid', 'Please check all required fields marked with *', 'warning');
            return;
        }

        this.isLoading = true;
        const formData = new FormData();
        Object.keys(this.productForm.controls).forEach(key => {
            const value = this.productForm.get(key)?.value;
            if (key === 'categoryIds') {
                value.forEach((catId: string) => formData.append('categoryIds', catId));
            } else {
                formData.append(key, value);
            }
        });

        this.selectedFiles.forEach(file => formData.append('images', file));

        const request = this.isEditMode
            ? this.productService.updateProduct(this.productId!, formData)
            : this.productService.createProduct(formData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                Swal.fire('Success', `Product ${this.isEditMode ? 'updated' : 'created'}!`, 'success')
                    .then(() => this.router.navigate(['/admin/all-products']));
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Save product error:', error);
                let errorMessage = 'Failed to save product';
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
        this.router.navigate(['/admin/all-products']);
    }
}
