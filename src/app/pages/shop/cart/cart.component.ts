import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';
import { OrderService } from '../../../../services/order.service';
import { AuthService } from '../../../../services/auth.service';
import { getImageUrl } from '../../../utils/url.helper';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    cartItems: any[] = [];
    subtotal: number = 0;
    total: number = 0;
    couponCode: string = '';

    constructor(
        private cartService: CartService,
        private orderService: OrderService,
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.cartService.cartItems$.subscribe(items => {
            this.cartItems = items;
            this.calculateTotals();
        });
    }

    calculateTotals(): void {
        this.subtotal = this.cartService.getCartTotal();
        this.total = this.subtotal; // Add tax or shipping if needed
    }

    incrementQuantity(item: any): void {
        this.cartService.updateQuantity(item.id, item.quantity + 1);
    }

    decrementQuantity(item: any): void {
        if (item.quantity > 1) {
            this.cartService.updateQuantity(item.id, item.quantity - 1);
        }
    }

    removeItem(item: any): void {
        this.cartService.removeFromCart(item.id);
    }

    getImageUrl(image: any): string {
        return getImageUrl(image, 'assets/images/placeholder-product.png');
    }

    applyCoupon(): void {
        console.log('Applying coupon:', this.couponCode);
        // Implement coupon logic
    }

    proceedToCheckout(): void {
        const user = this.authService.getUser();
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Please log in',
                text: 'You must be logged in to proceed to checkout.',
            });
            this.router.navigate(['/Auth/Login']);
            return;
        }

        if (this.cartItems.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Cart is empty',
                text: 'Please add items to your cart before checking out.',
            });
            return;
        }

        const orderData = {
            userId: user.id,
            items: this.cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity
            }))
        };

        Swal.fire({
            title: 'Processing Order...',
            text: 'Please wait while we create your order.',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        this.orderService.createOrder(orderData).subscribe({
            next: (res: any) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thank you!',
                    text: 'Your order has been placed successfully.',
                    showConfirmButton: false,
                    timer: 2000,
                    position: 'top-end',
                    toast: true
                });
                this.cartService.clearCart();
                this.router.navigate(['/Home']);
            },
            error: (err) => {
                console.error('Order creation failed:', err);
                Swal.fire({
                    icon: 'error',
                    title: 'Order Failed',
                    text: err.error?.message || 'Something went wrong while placing your order. Please try again.',
                });
            }
        });
    }
}
