import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../../services/post.service';
import Swal from 'sweetalert2';
import { getApiUrl } from '../../utils/url.helper';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-post.html',
  styleUrls: ['./add-post.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  isLoading = false;
  imagePreviewUrls: string[] = [];
  selectedFiles: File[] = [];
  isEditMode = false;
  postId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      content: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  getImageUrl(path: string): string {
    if (path && path.startsWith('data:')) return path; // Keep data URLs as-is
    return getApiUrl(path);
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    if (this.postId) {
      this.isEditMode = true;
      this.fetchPost(this.postId);
    }
  }

  fetchPost(id: string): void {
    this.isLoading = true;
    this.postService.getPost(id).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        const post = response.data || response;
        this.postForm.patchValue({
          title: post.title,
          content: post.content
        });
        if (post.image && post.image.length > 0) {
          this.imagePreviewUrls = post.image.map((img: string) => this.getImageUrl(img));
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching post:', error);
        Swal.fire('Error', 'Failed to load post data', 'error');
      }
    });
  }

  // Handle image file selection
  onImageSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        // Preview image
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewUrls.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // Remove image from preview and selection
  removeImage(index: number): void {
    this.imagePreviewUrls.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  }

  // Submit form to create post
  onSubmit(): void {
    if (this.postForm.invalid) {
      this.postForm.markAllAsTouched();
      Swal.fire('Validation Error', 'Please fill all required fields correctly', 'warning');
      return;
    }

    this.isLoading = true;

    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('content', this.postForm.get('content')?.value);

    // Append images
    this.selectedFiles.forEach(file => {
      formData.append('images', file); // Matches backend @UseInterceptors(FilesInterceptor('images'))
    });

    const request = this.isEditMode
      ? this.postService.updatePost(this.postId!, formData)
      : this.postService.createPost(formData);

    request.subscribe({
      next: (response) => {
        this.isLoading = false;
        const action = this.isEditMode ? 'updated' : 'created';
        Swal.fire('Success', `Post ${action} successfully!`, 'success').then(() => {
          this.router.navigate(['/admin/posts']);
        });

        if (!this.isEditMode) {
          this.postForm.reset();
          this.imagePreviewUrls = [];
          this.selectedFiles = [];
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error(`${this.isEditMode ? 'Update' : 'Create'} post error:`, error);
        Swal.fire('Error', error.error?.message || `Failed to ${this.isEditMode ? 'update' : 'create'} post.`, 'error');
      }
    });
  }

  // Cancel and go back
  onCancel(): void {
    this.router.navigate(['/admin/dashboard']);
  }

  // Get form control
  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }
}
