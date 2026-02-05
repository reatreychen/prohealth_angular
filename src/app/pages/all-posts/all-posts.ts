import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../../../services/post.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { getApiUrl } from '../../utils/url.helper';

@Component({
    selector: 'app-all-posts',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './all-posts.html',
    styleUrls: ['./all-posts.css']
})
export class AllPostsComponent implements OnInit {
    posts: any[] = [];
    isLoading = false;

    constructor(private postService: PostService, private router: Router) { }

    getImageUrl(path: string): string {
        return getApiUrl(path);
    }

    ngOnInit(): void {
        this.fetchPosts();
    }

    fetchPosts(): void {
        this.isLoading = true;
        this.postService.getPosts().subscribe({
            next: (response: any) => {
                this.isLoading = false;
                // Adjust depending on API response structure (e.g. response.data or response directly)
                this.posts = Array.isArray(response) ? response : response.data || [];
            },
            error: (error) => {
                this.isLoading = false;
                console.error('Error fetching posts:', error);
                Swal.fire('Error', 'Failed to fetch posts', 'error');
            }
        });
    }

    deletePost(id: string): void {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this.postService.deletePost(id).subscribe({
                    next: () => {
                        Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                        this.fetchPosts(); // Refresh list
                    },
                    error: (error) => {
                        console.error('Delete error:', error);
                        Swal.fire('Error', 'Failed to delete post', 'error');
                    }
                });
            }
        });
    }

    editPost(id: string): void {
        this.router.navigate(['/admin/posts/edit', id]);
    }
}
