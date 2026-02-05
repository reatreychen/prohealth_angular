import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { PricingPlanService } from '../../../../services/pricing-plan.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-add-pricing-plan',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './add-pricing-plan.html',
    styleUrls: ['./add-pricing-plan.css']
})
export class AddPricingPlanComponent implements OnInit {
    planForm: FormGroup;
    isEditMode = false;
    planId: string | null = null;
    isLoading = false;

    constructor(
        private fb: FormBuilder,
        private pricingPlanService: PricingPlanService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.planForm = this.fb.group({
            name: ['', [Validators.required]],
            subtitle: ['', [Validators.required]],
            price: [0, [Validators.required, Validators.min(0)]],
            currency: ['USD', [Validators.required]],
            duration: [30, [Validators.required, Validators.min(1)]],
            features: this.fb.array([this.fb.control('', Validators.required)])
        });
    }

    get features() {
        return this.planForm.get('features') as FormArray;
    }

    ngOnInit(): void {
        this.planId = this.route.snapshot.paramMap.get('id');
        if (this.planId) {
            this.isEditMode = true;
            this.loadPlanData();
        }
    }

    loadPlanData(): void {
        if (!this.planId) return;
        this.pricingPlanService.getPlan(this.planId).subscribe({
            next: (response: any) => {
                const plan = response.data;

                // Handle features array
                this.features.clear();
                if (plan.features && plan.features.length > 0) {
                    plan.features.forEach((f: string) => this.features.push(this.fb.control(f, Validators.required)));
                } else {
                    this.addFeature();
                }

                this.planForm.patchValue({
                    name: plan.name,
                    subtitle: plan.subtitle,
                    price: plan.price,
                    currency: plan.currency,
                    duration: plan.duration
                });
            },
            error: () => Swal.fire('Error', 'Failed to load plan details', 'error')
        });
    }

    addFeature(): void {
        this.features.push(this.fb.control('', Validators.required));
    }

    removeFeature(index: number): void {
        if (this.features.length > 1) {
            this.features.removeAt(index);
        }
    }

    onSubmit(): void {
        if (this.planForm.invalid) {
            this.planForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        const planData = this.planForm.value;

        const request = this.isEditMode
            ? this.pricingPlanService.updatePlan(this.planId!, planData)
            : this.pricingPlanService.createPlan(planData);

        request.subscribe({
            next: () => {
                this.isLoading = false;
                Swal.fire('Success', `Pricing plan ${this.isEditMode ? 'updated' : 'created'} successfully!`, 'success')
                    .then(() => this.router.navigate(['/admin/pricing']));
            },
            error: (err) => {
                this.isLoading = false;
                const msg = err.error?.message || 'Something went wrong';
                Swal.fire('Error', Array.isArray(msg) ? msg.join(', ') : msg, 'error');
            }
        });
    }
}
