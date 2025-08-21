import { Component } from '@angular/core';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(private scrollService: ScrollService) {}

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  scrollTo(sectionId: string): void {
    this.scrollService.scrollTo(sectionId);
    // Close the mobile menu after clicking a link
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
    }
  }
}
