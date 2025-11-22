import { Component, OnInit } from '@angular/core';
import {NgForOf} from '@angular/common';
import {RouterLink} from '@angular/router';


interface Blog {
  image: string;
  date: string;
  title: string;
}

@Component({
  selector: 'app-blog-card',
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
})
export class BlogCard implements OnInit {
    blog1 :string = 'assets/blog1.jpg'
  allBlogs = [
    {
      image: 'assets/blog1.jpg',
      date: 'May 19, 2025',
      title: 'The Importance of Mental Health: Understanding and Managing Anxiety Disorders'
    },
    {
      image: 'assets/blog2.jpg',
      date: 'Jun 02, 2025',
      title: 'How to Build Resilience: Practical Tips for Everyday Life'
    },
    {
      image: 'assets/blog3.jpg',
      date: 'Jul 10, 2025',
      title: 'Healthy Habits for a Better Mind and Body'
    },
    {
      image: 'assets/blog4.jpg',
      date: 'May 19, 2025',
      title: 'The Importance of Mental Health: Understanding and Managing Anxiety Disorders'
    },
    {
      image: 'assets/blog2.jpg',
      date: 'Jun 02, 2025',
      title: 'How to Build Resilience: Practical Tips for Everyday Life'
    },
    {
      image: 'assets/blog4.jpg',
      date: 'Jul 10, 2025',
      title: 'Healthy Habits for a Better Mind and Body'
    },
    {
      image: 'assets/blog5.jpg',
      date: 'May 19, 2025',
      title: 'The Importance of Mental Health: Understanding and Managing Anxiety Disorders'
    },
    {
      image: 'assets/blog6.jpg',
      date: 'Jun 02, 2025',
      title: 'How to Build Resilience: Practical Tips for Everyday Life'
    },
    {
      image: 'assets/blog7.jpg',
      date: 'Jul 10, 2025',
      title: 'Healthy Habits for a Better Mind and Body'
    },
    {
      image: 'assets/blog1.jpg',
      date: 'May 19, 2025',
      title: 'The Importance of Mental Health: Understanding and Managing Anxiety Disorders'
    },
    {
      image: 'assets/blog2.jpg',
      date: 'Jun 02, 2025',
      title: 'How to Build Resilience: Practical Tips for Everyday Life'
    },
    {
      image: 'assets/blog3.jpg',
      date: 'Jul 10, 2025',
      title: 'Healthy Habits for a Better Mind and Body'
    }
  ];

  blogs: Blog[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  pageNumbers: number[] = [];

  constructor() {}

  ngOnInit(): void {
    this.calculatePagination();
    this.updateDisplayedBlogs();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.allBlogs.length / this.itemsPerPage);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updateDisplayedBlogs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.blogs = this.allBlogs.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedBlogs();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedBlogs();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedBlogs();
    }
  }

  trackByIndex(index: number): number {
    return index;
  }
}
