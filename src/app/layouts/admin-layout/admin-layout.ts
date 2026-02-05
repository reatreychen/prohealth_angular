import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../adminComponents/sidebar/sidebar';
import { AdminHeader } from '../../adminComponents/admin-header/admin-header';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Sidebar,
    AdminHeader
  ],
  templateUrl: './admin-layout.html',
})
export class AdminLayoutComponent {
  isSidebarOpen = typeof window !== 'undefined' ? window.innerWidth >= 1024 : false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
