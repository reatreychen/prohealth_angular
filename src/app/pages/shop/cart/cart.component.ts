import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../services/cart.service';
import { getImageUrl } from '../../../utils/url.helper';

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

    constructor(private cartService: CartService) { }

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
        console.log('Proceeding to checkout');
        // Navigate to checkout or implement order creation
    }
}
