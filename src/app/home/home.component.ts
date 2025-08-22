import { Component, HostListener, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public scale = 1;
  homeContent: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.homeContent = data.home;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    // Decrease scale from 1 down to a minimum of 0.8 as the user scrolls
    const newScale = Math.max(0.8, 1 - scrollOffset / 1000);
    this.scale = newScale;
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
