import { Component, HostListener, OnInit } from '@angular/core';
import { ContentService } from './content.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isMenuOpen = false;
  activeSection = 'home';
  navigation: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.navigation = data.navigation;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const sections = ['home', 'about', 'experience', 'projects', 'connect'];
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        const offsetTop = element.offsetTop;
        const height = element.offsetHeight;

        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
          this.activeSection = section;
        }
      }
    });
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMenuOpen = false;
  }
}
