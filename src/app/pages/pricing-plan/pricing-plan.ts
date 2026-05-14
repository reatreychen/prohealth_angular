import { Component } from '@angular/core';
import { BannerPricingPlan } from '../../pricingPlanComponent/banner-pricing-plan/banner-pricing-plan';
import { CardPricingPlan } from '../../pricingPlanComponent/card-pricing-plan/card-pricing-plan';
import { Partner } from '../../HomeComponents/partner/partner';
import { BookAppoinment } from '../../HomeComponents/book-appoinment/book-appoinment';

@Component({
  selector: 'app-pricing-plan',
  imports: [BannerPricingPlan, CardPricingPlan, Partner, BookAppoinment],
  templateUrl: './pricing-plan.html',
  styleUrl: './pricing-plan.css',
})
export class PricingPlan {

}

