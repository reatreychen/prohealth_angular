import { Component, OnInit } from '@angular/core';
import { NgForOf, CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';
import { getImageUrl } from '../../utils/url.helper';

interface Blog {
  id?: string;
  image: string;
  date: string;
  title: string;
}

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    CommonModule
  ],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.css',
  providers: [DatePipe]
})
export class BlogCard implements OnInit {
  allBlogs: Blog[] = [];
  blogs: Blog[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;
  pageNumbers: number[] = [];
  isLoading = false;

  constructor(
    private postService: PostService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchBlogs();
  }

  fetchBlogs(): void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const rawPosts = response.data || [];
        this.allBlogs = rawPosts.map((post: any) => ({
          id: post.id,
          title: post.title,
          date: this.datePipe.transform(post.createdAt, 'MMM dd, yyyy') || '',
          image: this.getImageUrl(post.image)
        }));
        this.calculatePagination();
        this.updateDisplayedBlogs();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching blogs:', err);
      }
    });
  }

  getImageUrl(images: any[] | string | undefined | null): string {
    return getImageUrl(images, 'assets/blog1.jpg');
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.allBlogs.length / this.itemsPerPage);
    if (this.totalPages < 1) this.totalPages = 1;
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
