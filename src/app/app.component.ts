import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import portfolioData from '../../public/assets/portfolio.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  data: any = portfolioData; 
  currentProjectIndex = 0;
  activeExperienceIndex = 0;
  activeSkillCategoryIndex = 0;
  selectedProject: any = null;
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openResume() {
    window.open(this.data.header.resumeLink, '_blank');
  }

  nextProject() {
    this.currentProjectIndex = (this.currentProjectIndex + 1) % this.data.projects.length;
  }

  prevProject() {
    this.currentProjectIndex = (this.currentProjectIndex - 1 + this.data.projects.length) % this.data.projects.length;
  }

  openProjectDetails(project: any) {
    this.selectedProject = project;
    document.body.style.overflow = 'hidden';
  }

  closeProjectDetails() {
    this.selectedProject = null;
    document.body.style.overflow = 'auto';
  }
}
