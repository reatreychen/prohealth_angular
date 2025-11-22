import { Component } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';

interface Facility {
  id: string;
  image: string;
  alt: string;
  width: string;
  height: string;
  gridPosition?: 'left' | 'right' | 'full';
}

@Component({
  selector: 'app-facilities',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './facilities.html',
  styleUrl: './facilities.css',
})
export class Facilities {
  facilities: Facility[] = [
    {
      id: 'facility1',
      image: 'assets/facilities1.jpg',
      alt: 'Medical facility',
      width: '416px',
      height: '429px',
      gridPosition: 'left'
    },
    {
      id: 'facility2',
      image: 'assets/facilities2.jpg',
      alt: 'Medical facility',
      width: '416px',
      height: '429px',
      gridPosition: 'left'
    },
    {
      id: 'facility3',
      image: 'assets/facilities3.jpg',
      alt: 'Medical facility',
      width: '416px',
      height: '716px',
      gridPosition: 'right'
    },
    {
      id: 'facility4',
      image: 'assets/facilities4.jpg',
      alt: 'Medical facility',
      width: '856px',
      height: '429px',
      gridPosition: 'full'
    },
    {
      id: 'facility5',
      image: 'assets/facilities5.jpg',
      alt: 'Medical facility',
      width: '416px',
      height: '429px',
      gridPosition: 'right'
    }
  ];

  hoveredFacilityId: string | null = null;

  onMouseEnter(facilityId: string) {
    this.hoveredFacilityId = facilityId;
  }

  onMouseLeave() {
    this.hoveredFacilityId = null;
  }

  isHovered(facilityId: string): boolean {
    return this.hoveredFacilityId === facilityId;
  }

  getLeftColumnFacilities(): Facility[] {
    return this.facilities.filter(f => f.gridPosition === 'left');
  }

  getRightColumnFacility(): Facility | undefined {
    return this.facilities.find(f => f.gridPosition === 'right' && f.height === '716px');
  }

  getBottomRowFacilities(): Facility[] {
    return this.facilities.filter(f => f.gridPosition === 'full' || (f.gridPosition === 'right' && f.height === '429px'));
  }
}
