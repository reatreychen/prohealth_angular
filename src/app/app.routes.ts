import { Routes } from '@angular/router';
import { HomeComponent } from './pages/homePage/home';
import { AboutPage } from './pages/about-page/about-page';
import { FindDoctor } from './pages/find-doctor/find-doctor';
import { Blogs } from './pages/blogs/blogs';
import { Appointments } from './pages/appointments/appointments';
import { Departments } from './pages/departments/departments';
import { TimeTable } from './pages/time-table/time-table';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout';
import { PublicLayoutComponent } from './layouts/pulic-layout/pulic-layout';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { AddPostComponent } from './pages/add-post/add-post';
import { AllPostsComponent } from './pages/all-posts/all-posts';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AllProductsComponent } from './pages/products/all-products/all-products';
import { CreateProductComponent } from './pages/products/create-product/create-product';
import { AllCategoriesComponent } from './pages/products/all-categories/all-categories';
import { CreateCategoryComponent } from './pages/products/create-category/create-category';
import { AllOrdersComponent } from './pages/orders/all-orders/all-orders';
import { AllDepartmentsAdminComponent } from './pages/admin-departments/all-departments/all-departments';
import { AddDepartmentComponent } from './pages/admin-departments/add-department/add-department';
import { AllDoctorsComponent } from './pages/admin-doctors/all-doctors/all-doctors';
import { AddDoctorComponent } from './pages/admin-doctors/add-doctor/add-doctor';
import { AllUsersComponent } from './pages/admin-users/all-users/all-users';
import { AddUserComponent } from './pages/admin-users/add-user/add-user';
import { AllPricingPlansComponent } from './pages/admin-pricing/all-pricing-plans/all-pricing-plans';
import { AddPricingPlanComponent } from './pages/admin-pricing/add-pricing-plan/add-pricing-plan';
import { ShopComponent } from './pages/shop/shop';
import { PricingPlan } from './pages/pricing-plan/pricing-plan';

export const routes: Routes = [
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutPage },
      { path: 'find-doctor', component: FindDoctor },
      { path: 'blog', component: Blogs },
      { path: 'appointments', component: Appointments },
      { path: 'department', component: Departments },
      { path: 'timeTable', component: TimeTable },
      { path: 'login', component: Login },
      { path: 'register', component: Register },
      { path: 'shop', component: ShopComponent },
      { path: 'pricing-plan', component: PricingPlan },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard, AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'posts', component: AllPostsComponent },
      { path: 'posts/new', component: AddPostComponent },
      { path: 'posts/edit/:id', component: AddPostComponent },
      { path: 'all-products', component: AllProductsComponent },
      { path: 'products/create', component: CreateProductComponent },
      { path: 'products/edit/:id', component: CreateProductComponent },
      { path: 'products/categories', component: AllCategoriesComponent },
      { path: 'products/categories/create', component: CreateCategoryComponent },
      { path: 'products/categories/edit/:id', component: CreateCategoryComponent },
      { path: 'orders', component: AllOrdersComponent },
      { path: 'orders/completed', component: AllOrdersComponent },
      { path: 'orders/cancelled', component: AllOrdersComponent },
      { path: 'orders/pending-payment', component: AllOrdersComponent },
      { path: 'departments', component: AllDepartmentsAdminComponent },
      { path: 'departments/new', component: AddDepartmentComponent },
      { path: 'departments/edit/:id', component: AddDepartmentComponent },
      { path: 'doctors', component: AllDoctorsComponent },
      { path: 'doctors/new', component: AddDoctorComponent },
      { path: 'doctors/edit/:id', component: AddDoctorComponent },
      { path: 'users', component: AllUsersComponent },
      { path: 'users/new', component: AddUserComponent },
      { path: 'users/edit/:id', component: AddUserComponent },
      { path: 'pricing', component: AllPricingPlansComponent },
      { path: 'pricing/new', component: AddPricingPlanComponent },
      { path: 'pricing/edit/:id', component: AddPricingPlanComponent },
    ],
  },
  {
    path: 'dashboard',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full'
  }
];
