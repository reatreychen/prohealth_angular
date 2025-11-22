import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-partner',
  imports: [CommonModule],
  templateUrl: './partner.html',
  styleUrl: './partner.css',
})
export class Partner {
  drugstore: string = '/assets/drugstore.png';
  healthCare: string = '/assets/healthCare.png';
  hospital: string = '/assets/hospital.png';
  medical: string = '/assets/medical.png';
  medicalSolution: string = '/assets/medicalSolution.png';
  phamacy: string = '/assets/phamacy.png';
  phamacySlogan: string = '/assets/phamacySlogan.png';
}
