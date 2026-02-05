import { Component } from '@angular/core';
import { BannerPricingPlan } from '../../pricingPlanComponent/banner-pricing-plan/banner-pricing-plan';
import { CardPricingPlan } from '../../pricingPlanComponent/card-pricing-plan/card-pricing-plan';

@Component({
  selector: 'app-pricing-plan',
  imports: [BannerPricingPlan, CardPricingPlan],
  templateUrl: './pricing-plan.html',
  styleUrl: './pricing-plan.css',
})
export class PricingPlan {

}
