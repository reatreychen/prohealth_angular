import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './our-value.html',
  styleUrl: './our-value.css',
})
export class OurValue implements OnInit {
  currentSlide = 0;
  slidesPerView = 3;
  totalSlides = 5;
  maxSlide = 0;
  
  // 1. ADD THIS PROPERTY
  // This value MUST match the width of your slides (w-[370px])
  slideWidth = 370;

  ngOnInit() {
    this.updateSlidesPerView();
    this.calculateMaxSlide();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateSlidesPerView();
    this.calculateMaxSlide();
    if (this.currentSlide > this.maxSlide) {
      this.currentSlide = this.maxSlide;
    }
  }

  updateSlidesPerView() {
    const width = window.innerWidth;
    if (width < 768) {
      this.slidesPerView = 1;
    } else if (width < 1024) {
      this.slidesPerView = 2;
    } else {
      this.slidesPerView = 3;
    }
  }

  calculateMaxSlide() {
    this.maxSlide = Math.max(0, this.totalSlides - this.slidesPerView);
  }

  nextSlide() {
    if (this.currentSlide < this.maxSlide) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; // Loop back to start
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.maxSlide; // Loop to end
    }
  }

  // 2. ADD THIS FUNCTION
  // This will calculate the exact pixel distance to move
  getTransform(): string {
    const offset = this.currentSlide * this.slideWidth;
    return `translateX(-${offset}px)`;
  }
}