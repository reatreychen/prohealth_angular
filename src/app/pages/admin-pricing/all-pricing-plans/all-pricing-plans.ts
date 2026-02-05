import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PricingPlanService } from '../../../../services/pricing-plan.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-all-pricing-plans',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-pricing-plans.html',
    styleUrls: ['./all-pricing-plans.css']
})
export class AllPricingPlansComponent implements OnInit {
    plans: any[] = [];
    isLoading = false;

    constructor(
        private pricingPlanService: PricingPlanService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.fetchPlans();
    }

    fetchPlans(): void {
        this.isLoading = true;
        this.pricingPlanService.getPlans().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                this.plans = response.data || [];
            },
            error: (error: any) => {
                this.isLoading = false;
                console.error('Fetch plans error:', error);
                Swal.fire('Error', 'Failed to fetch pricing plans', 'error');
            }
        });
    }

    deletePlan(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.pricingPlanService.deletePlan(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Pricing plan has been deleted.', 'success');
                        this.fetchPlans();
                    },
                    error: (error: any) => {
                        console.error('Delete plan error:', error);
                        Swal.fire('Error', 'Failed to delete pricing plan', 'error');
                    }
                });
            }
        });
    }

    editPlan(id: string): void {
        this.router.navigate(['/admin/pricing/edit', id]);
    }
}
