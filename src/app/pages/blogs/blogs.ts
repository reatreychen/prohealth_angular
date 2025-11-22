import { Component } from '@angular/core';
import {BlogCard} from '../../BlogComponents/blog-card/blog-card';
@Component({
  selector: 'app-blogs',
  imports: [BlogCard],
  templateUrl: './blogs.html',
  styleUrl: './blogs.css',
})
export class Blogs {
  background : string = 'assets/background-home.svg';
}
