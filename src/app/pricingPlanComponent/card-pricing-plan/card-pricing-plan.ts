import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PricingPlanService, PricingPlan } from './pricing-plan.service';

@Component({
  selector: 'app-card-pricing-plan',
  imports: [CommonModule],
  templateUrl: './card-pricing-plan.html',
  styleUrl: './card-pricing-plan.css',
})
export class CardPricingPlan implements OnInit {
  pricingPlans: PricingPlan[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private pricingPlanService: PricingPlanService) { }

  ngOnInit(): void {
    this.loadPricingPlans();
  }

  loadPricingPlans(): void {
    this.loading = true;
    this.error = '';

    this.pricingPlanService.getAllPricingPlans().subscribe({
      next: (plans) => {
        this.pricingPlans = plans;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching pricing plans:', err);
        this.error = 'Failed to load pricing plans. Please try again.';
        this.loading = false;
      }
    });
  }
}
