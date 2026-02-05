import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
@Component({
  selector: 'app-banner-pricing-plan',
  imports: [NgStyle],
  templateUrl: './banner-pricing-plan.html',
  styleUrl: './banner-pricing-plan.css',
})
export class BannerPricingPlan {
    background : string = 'assets/background-home.svg';
    banner_pricing: string = "assets/pricing.png";
}
