import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { getImageUrl as getUrlHelper } from '../../../utils/url.helper';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './product-details.html',
    styleUrls: ['./product-details.css']
})
export class ProductDetailsComponent implements OnInit {
    product: any = null;
    isLoading = false;
    selectedImage: string = '';
    quantity: number = 1;
    activeTab: string = 'description';
    currentImageIndex = 0;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const id = params['id'];
            if (id) {
                this.fetchProduct(id);
            }
        });
    }

    fetchProduct(id: string): void {
        this.isLoading = true;
        this.productService.getProduct(id).subscribe({
            next: (res: any) => {
                this.isLoading = false;
                // Adjust depending on API response structure. 
                this.product = res.data || res;
                console.log('Fetched Product:', this.product);

                // Normalize images array for navigation
                let imagesArr = [];
                if (this.product.images && Array.isArray(this.product.images) && this.product.images.length > 0) {
                    // Check if the first element is itself an array (nested array)
                    imagesArr = Array.isArray(this.product.images[0]) ? this.product.images[0] : this.product.images;
                } else if (this.product.image) {
                    // If image is an array, use it; otherwise wrap it
                    imagesArr = Array.isArray(this.product.image) ? this.product.image : [this.product.image];
                }

                this.product.images = imagesArr;
                console.log('Normalized Images:', this.product.images);

                // Set initial selected image
                this.currentImageIndex = 0;
                if (this.product.images.length > 0) {
                    this.updateSelectedImageFromIndex();
                } else {
                    this.selectedImage = this.getImageUrl(null);
                }
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Error fetching product:', err);
            }
        });
    }

    getImageUrl(image: any): string {
        return getUrlHelper(image, 'assets/images/placeholder-product.png');
    }

    private updateSelectedImageFromIndex(): void {
        if (this.product?.images && this.product.images.length > 0) {
            const safeIndex = Math.min(
                Math.max(this.currentImageIndex, 0),
                this.product.images.length - 1
            );
            this.selectedImage = this.getImageUrl(this.product.images[safeIndex]);
        }
    }

    selectImage(image: string): void {
        this.selectedImage = this.getImageUrl(image);
    }

    selectImageByIndex(index: number): void {
        this.currentImageIndex = index;
        this.updateSelectedImageFromIndex();
    }

    prevImage(): void {
        if (!this.product?.images || this.product.images.length === 0) {
            return;
        }
        this.currentImageIndex =
            (this.currentImageIndex - 1 + this.product.images.length) %
            this.product.images.length;
        this.updateSelectedImageFromIndex();
    }

    nextImage(): void {
        if (!this.product?.images || this.product.images.length === 0) {
            return;
        }
        this.currentImageIndex =
            (this.currentImageIndex + 1) % this.product.images.length;
        this.updateSelectedImageFromIndex();
    }

    incrementQuantity(): void {
        this.quantity++;
    }

    decrementQuantity(): void {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product, this.quantity);

            Swal.fire({
                icon: 'success',
                title: 'Added to cart!',
                text: `${this.product.name} has been added to your cart.`,
                showConfirmButton: false,
                timer: 1500,
                position: 'top-end',
                toast: true
            });
        }
    }
}
