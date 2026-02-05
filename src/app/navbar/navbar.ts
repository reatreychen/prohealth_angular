import {
  Component,
  HostListener,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar implements OnInit, OnDestroy {
  logo = 'assets/logo.svg';

  isScrolled = false;
  showProfileDropdown = false;

  isLoggedIn = false;
  isMobileMenuOpen = false;
  user: any = null;
  userRole: 'USER' | 'ADMIN' = 'USER';

  private routerSub!: Subscription;
  private authListener!: (event: any) => void;

  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.checkAuth();

    // Update after navigation (login redirect)
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkAuth();
      }
    });

    this.authListener = (event: any) => {
      const wasLoggedIn = this.isLoggedIn;
      this.checkAuth();

      if (!wasLoggedIn && this.isLoggedIn && event.detail?.action === 'login') {
        this.showProfileDropdown = true;
      }

      if (wasLoggedIn && !this.isLoggedIn) {
        this.showProfileDropdown = false;
      }

      this.cdr.detectChanges();
    };

    window.addEventListener('auth:changed', this.authListener as EventListener);
  }

  ngOnDestroy() {
    this.routerSub?.unsubscribe();
    window.removeEventListener('auth:changed', this.authListener as EventListener);
  }

  checkAuth() {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.isLoggedIn = true;
      this.user = JSON.parse(user);
      this.userRole = this.user.role || 'USER';
    } else {
      this.isLoggedIn = false;
      this.user = null;
      this.userRole = 'USER';
    }

    this.cdr.detectChanges();
  }

  toggleProfileDropdown() {
    this.showProfileDropdown = !this.showProfileDropdown;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    // Show confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#307bc3',
      confirmButtonText: 'Logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();

        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have been successfully logged out.',
          confirmButtonColor: '#307bc3',
          timer: 2000,
          timerProgressBar: true,
        });

        this.router.navigate(['/']);
      }
    });
  }

  goToDashboard() {
    this.router.navigate([
      this.userRole === 'ADMIN' ? '/admin-dashboard' : '/user-dashboard',
    ]);
    this.showProfileDropdown = false;
  }

  goToProfile() {
    this.router.navigate(['/profile']);
    this.showProfileDropdown = false;
  }

  goToOrders() {
    this.router.navigate(['/my-orders']);
    this.showProfileDropdown = false;
  }

  onProfileClick() {
    if (this.isLoggedIn) {
      this.toggleProfileDropdown();
    } else {
      this.router.navigate(['/login']);
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 5;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-dropdown-container')) {
      this.showProfileDropdown = false;
    }
  }
}
