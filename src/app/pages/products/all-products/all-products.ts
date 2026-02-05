import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../../services/product.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { getImageUrl } from '../../../utils/url.helper';

@Component({
    selector: 'app-all-products',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-products.html',
    styleUrls: ['./all-products.css']
})
export class AllProductsComponent implements OnInit {
    products: any[] = [];
    isLoading = false;

    constructor(private productService: ProductService, private router: Router) { }

    getImageUrl(path: string | string[]): string {
        return getImageUrl(path);
    }

    ngOnInit(): void {
        this.fetchProducts();
    }

    fetchProducts(): void {
        this.isLoading = true;
        this.productService.getProducts().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.products = Array.isArray(response) ? response : response.data || [];
            },
            error: (error) => {
                this.isLoading = false;
                console.error('Error fetching products:', error);
                Swal.fire('Error', 'Failed to fetch products', 'error');
            }
        });
    }

    deleteProduct(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.productService.deleteProduct(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Product has been deleted.', 'success');
                        this.fetchProducts();
                    },
                    error: (error) => {
                        console.error('Delete error:', error);
                        Swal.fire('Error', 'Failed to delete product', 'error');
                    }
                });
            }
        });
    }

    editProduct(id: string): void {
        this.router.navigate(['/admin/products/edit', id]);
    }
}
