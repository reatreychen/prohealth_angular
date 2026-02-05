import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  @Input() isSidebarOpen = true;

  sidebarItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      link: '/admin/dashboard',
      active: true,
      hasDropdown: false,
      color: 'bg-indigo-500'
    },
    {
      id: 'posts',
      label: 'Posts',
      icon: 'posts',
      hasDropdown: true,
      isOpen: false,
      active: false,
      color: 'bg-blue-500',
      subItems: [
        { label: 'All Posts', link: '/admin/posts' },
        { label: 'Create Post', link: '/admin/posts/new' }
      ]
    },
    {
      id: 'users',
      label: 'Users',
      icon: 'users',
      color: 'bg-purple-500',
      hasDropdown: true,
      isOpen: false,
      active: false,
      subItems: [
        { label: 'All Users', link: '/admin/users' },
        { label: 'Add User', link: '/admin/users/new' },
      ]
    },
    {
      id: 'products',
      label: 'Products',
      icon: 'products',
      color: 'bg-rose-500',
      hasDropdown: true,
      isOpen: false,
      active: false,
      subItems: [
        { label: 'All Products', link: '/admin/all-products' },
        { label: 'Create Product', link: '/admin/products/create' },
        { label: 'All Categories', link: '/admin/products/categories' },
        { label: 'Create Category', link: '/admin/products/categories/create' },
      ]
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: 'orders',
      color: 'bg-orange-400',
      hasDropdown: true,
      isOpen: false,
      active: false,
      subItems: [
        { label: 'All Orders', link: '/admin/orders' },
        { label: 'Completed Orders', link: '/admin/orders/completed' },
        { label: 'Cancelled Orders', link: '/admin/orders/cancelled' },
        { label: 'Pending Payment Orders', link: '/admin/orders/pending-payment' }
      ]
    },
    {
      id: 'pricing',
      label: 'Pricing Plan',
      icon: 'pricing',
      color: 'bg-blue-600',
      hasDropdown: true,
      isOpen: false,
      active: false,
      subItems: [
        { label: 'All Plans', link: '/admin/pricing' },
        { label: 'Add new', link: '/admin/pricing/new' }
      ]
    },
    {
      id: 'departments',
      label: 'Departments',
      icon: 'departments',
      color: 'bg-indigo-600',
      hasDropdown: true,
      isOpen: false,
      active: false,
      subItems: [
        { label: 'All Departments', link: '/admin/departments' },
        { label: 'Add new', link: '/admin/departments/new' }
      ]
    },
    {
      id: 'doctors',
      label: 'Doctors',
      icon: 'doctors',
      color: 'bg-cyan-600',
      hasDropdown: true,
      isOpen: false,
      active: false,
      subItems: [
        { label: 'All Doctors', link: '/admin/doctors' },
        { label: 'Add new', link: '/admin/doctors/new' }
      ]
    },
  ];

  toggleDropdown(id: string | undefined) {
    if (!id) return;
    const item = this.sidebarItems.find(i => i.id === id);
    if (item && item.hasDropdown) {
      item.isOpen = !item.isOpen;
    }
  }
}
