import { Component, HostListener } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
})
export class Navbar {
  logo = "assets/logo.svg";


  isScrolled = false;
  showSearch = false;
  showLangDropdown = false;
  languages = ['English', 'Khmer'];
  selectedLanguage = 'English';


  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.showLangDropdown = false;
    }
  }

  toggleLangDropdown() {
    this.showLangDropdown = !this.showLangDropdown;
    if (this.showLangDropdown) {
      this.showSearch = false;
    }
  }


  selectLanguage(lang: string) {
    this.selectedLanguage = lang;
    this.showLangDropdown = false;
    // add real i18n switching logic here if needed
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY >5;
  }
}

