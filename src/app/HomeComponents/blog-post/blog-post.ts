import { Component, OnInit } from '@angular/core';
import { NgForOf, CommonModule, DatePipe } from '@angular/common';
import { PostService } from '../../../services/post.service';
import { getImageUrl } from '../../utils/url.helper';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [NgForOf, CommonModule],
  templateUrl: './blog-post.html',
  styleUrl: './blog-post.css',
  providers: [DatePipe]
})
export class BlogPost implements OnInit {
  latestPost: any = null;
  sidePosts: any[] = [];
  isLoading = false;

  constructor(
    private postService: PostService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.fetchLatestPosts();
  }

  fetchLatestPosts(): void {
    this.isLoading = true;
    this.postService.getPosts().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const allPosts = response.data || [];
        if (allPosts.length > 0) {
          // Format posts
          const formattedPosts = allPosts.map((post: any) => ({
            ...post,
            date: this.datePipe.transform(post.createdAt, 'MMM dd, yyyy') || '',
            displayImage: this.getImageUrl(post.image)
          }));

          this.latestPost = formattedPosts[0];
          this.sidePosts = formattedPosts.slice(1, 4); // Next 3 posts
        }
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error fetching latest posts:', err);
      }
    });
  }

  getImageUrl(images: string[]): string {
    return getImageUrl(images, 'assets/blog1.jpg');
  }
}
