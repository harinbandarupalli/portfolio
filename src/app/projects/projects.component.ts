import { Component, OnInit, OnDestroy, ChangeDetectorRef, HostListener } from '@angular/core';
import { ContentService } from '../content.service';

// Define interfaces for strong typing
export interface CaseStudy {
  title: string;
  problem: string;
  solution: string;
  results: string;
  architecture: string;
}

export interface Project {
  image: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl: string;
  caseStudy?: CaseStudy; // Case study data is optional
}

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  currentProject = 1; // Start at 1 for the cloned slide
  transitionEnabled = true;
  readonly transitionDuration = 500;
  private autoPlayInterval: any;

  projectsContent: any;
  projects: Project[] = [];
  extendedProjects: Project[] = [];

  // Property to hold the selected case study for the modal
  selectedCaseStudy: CaseStudy | null = null;

  @HostListener('window:keydown.esc', ['$event'])
  onEsc(event: KeyboardEvent) {
    if (this.selectedCaseStudy) {
      this.closeCaseStudy();
    }
  }

  constructor(private contentService: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.contentService.getContent().subscribe(data => {
      this.projectsContent = data.projects;
      const loadedProjects: Project[] = this.projectsContent.items;

      this.projects = loadedProjects;
      this.extendedProjects = [this.projects[this.projects.length - 1], ...this.projects, this.projects[0]];
      this.startAutoPlay();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    this.autoPlayInterval = setInterval(() => {
      if (this.transitionEnabled) {
        this.nextProject();
      }
    }, 4000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextProject(): void {
    if (!this.transitionEnabled) return;
    this.currentProject++;
    this.handleCarouselLoop();
  }

  prevProject(): void {
    if (!this.transitionEnabled) return;
    this.currentProject--;
    this.handleCarouselLoop();
  }

  goToProject(index: number): void {
    if (!this.transitionEnabled) return;
    this.currentProject = index + 1;
  }

  handleCarouselLoop(): void {
    if (this.currentProject === 0 || this.currentProject === this.extendedProjects.length - 1) {
      setTimeout(() => {
        this.transitionEnabled = false;
        this.currentProject = this.currentProject === 0 ? this.projects.length : 1;
        this.cdr.detectChanges(); // Manually trigger change detection

        // Re-enable transition after the jump
        setTimeout(() => {
          this.transitionEnabled = true;
          this.cdr.detectChanges();
        }, 50);

      }, this.transitionDuration);
    }
  }

  getActualIndex(): number {
    if (this.currentProject === 0) return this.projects.length - 1;
    if (this.currentProject > this.projects.length) return 0;
    return this.currentProject - 1;
  }

  getTransform(): string {
    return `translateX(-${this.currentProject * 100}%)`;
  }

  showCaseStudy(project: Project): void {
    if (project.caseStudy) {
      this.selectedCaseStudy = project.caseStudy;
      this.stopAutoPlay(); // Pause carousel when modal is open
    }
  }

  closeCaseStudy(): void {
    this.selectedCaseStudy = null;
    this.startAutoPlay(); // Resume carousel when modal is closed
  }
}
