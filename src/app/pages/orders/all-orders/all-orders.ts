import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../../services/order.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-all-orders',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-orders.html',
    styleUrls: ['./all-orders.css']
})
export class AllOrdersComponent implements OnInit {
    orders: any[] = [];
    filteredOrders: any[] = [];
    isLoading = false;
    currentFilter = 'all';

    constructor(
        private orderService: OrderService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.url.subscribe(url => {
            const path = url[0]?.path;
            if (path === 'completed') this.currentFilter = 'COMPLETED';
            else if (path === 'cancelled') this.currentFilter = 'CANCELLED';
            else if (path === 'pending-payment') this.currentFilter = 'PENDING_PAYMENT';
            else this.currentFilter = 'all';

            this.fetchOrders();
        });
    }

    fetchOrders(): void {
        this.isLoading = true;
        this.orderService.getOrders().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.orders = Array.isArray(response) ? response : response.data || [];
                this.applyFilter();
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Error fetching orders:', error);
                Swal.fire('Error', 'Failed to fetch orders', 'error');
            }
        });
    }

    applyFilter(): void {
        if (this.currentFilter === 'all') {
            this.filteredOrders = this.orders;
        } else if (this.currentFilter === 'PENDING_PAYMENT') {
            this.filteredOrders = this.orders.filter(o => o.paymentStatus === 'PENDING');
        } else {
            this.filteredOrders = this.orders.filter(o => o.orderStatus === this.currentFilter);
        }
    }

    getStatusColor(status: string): string {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-700';
            case 'CANCELLED': return 'bg-red-100 text-red-700';
            case 'PENDING': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    getPaymentStatusColor(status: string): string {
        switch (status) {
            case 'PAID': return 'bg-blue-100 text-blue-700';
            case 'FAILED': return 'bg-red-100 text-red-700';
            case 'PENDING': return 'bg-orange-100 text-orange-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }
}
