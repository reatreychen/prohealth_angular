import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { getImageUrl } from '../../utils/url.helper';

@Component({
    selector: 'app-shop',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './shop.html',
    styleUrls: ['./shop.css']
})
export class ShopComponent implements OnInit {
    products: any[] = [];
    filteredProducts: any[] = [];
    categories: any[] = [];
    isLoading = false;

    // Search and Filters
    searchQuery: string = '';
    selectedCategory: string = 'All';
    priceRange: number = 200;
    maxPrice: number = 200;

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService
    ) { }

    ngOnInit(): void {
        this.fetchCategories();
        this.fetchProducts();
    }

    fetchCategories(): void {
        this.categoryService.getCategories().subscribe({
            next: (res: any) => {
                this.categories = res.data || [];
            },
            error: (err) => console.error('Error fetching categories:', err)
        });
    }

    fetchProducts(): void {
        this.isLoading = true;
        this.productService.getProducts().subscribe({
            next: (res: any) => {
                this.isLoading = false;
                this.products = res.data || [];
                this.filteredProducts = [...this.products];
                this.updateMaxPrice();
                this.applyFilters();
            },
            error: (err) => {
                this.isLoading = false;
                console.error('Error fetching products:', err);
            }
        });
    }

    updateMaxPrice(): void {
        if (this.products.length > 0) {
            const prices = this.products.map(p => Number(p.price));
            this.maxPrice = Math.max(...prices);
            this.priceRange = this.maxPrice;
        }
    }

    applyFilters(): void {
        this.filteredProducts = this.products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
            const matchesCategory = this.selectedCategory === 'All' ||
                (product.categories && product.categories.some((c: any) => c.name === this.selectedCategory));
            const matchesPrice = Number(product.price) <= this.priceRange;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }

    selectCategory(categoryName: string): void {
        this.selectedCategory = categoryName;
        this.applyFilters();
    }

    onSearchChange(): void {
        this.applyFilters();
    }

    onPriceChange(): void {
        this.applyFilters();
    }

    getImageUrl(images: any[] | string | undefined | null): string {
        return getImageUrl(images, 'assets/images/placeholder-product.png');
    }

    getCategoryCount(categoryName: string): number {
        return this.products.filter(p =>
            p.categories && p.categories.some((c: any) => c.name === categoryName)
        ).length;
    }
}
