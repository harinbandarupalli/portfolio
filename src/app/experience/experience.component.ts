import { Component, ElementRef, QueryList, ViewChild, ViewChildren, AfterViewInit, OnDestroy, NgZone } from '@angular/core';
import { Experience } from './experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  activeNode = 0;
  experiences: Experience[] = [
    { id: 0, company: 'Company 1', role: 'Senior Developer', startDate: '2022', endDate: 'Present', responsibilities: ['Architected scalable backend services.', 'Managed a team of 3 junior developers.', 'Implemented new CI/CD pipelines.'], icon: 'fas fa-briefcase' },
    { id: 1, company: 'Company 2', role: 'Software Engineer', startDate: '2019', endDate: '2021', responsibilities: ['Developed and maintained front-end applications.', 'Collaborated on feature design and implementation.', 'Participated in code reviews and team meetings.'], icon: 'fas fa-briefcase' },
    { id: 2, company: 'Company 3', role: 'Junior Web Developer', startDate: '2017', endDate: '2019', responsibilities: ['Built responsive website layouts using HTML/CSS.', 'Integrated with RESTful APIs.', 'Assisted in debugging and fixing bugs.'], icon: 'fas fa-briefcase' },
    { id: 3, company: 'Company 4', role: 'Intern', startDate: '2016', endDate: '2016', responsibilities: ['Conducted research on new technologies.', 'Wrote documentation for existing codebases.', 'Assisted senior developers with daily tasks.'], icon: 'fas fa-briefcase' },
  ];

  @ViewChild('timelineContainer') timelineContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('nodes') nodes!: QueryList<ElementRef>;

  @ViewChild('mobileTimelineContainer') mobileTimelineContainer!: ElementRef<HTMLDivElement>;
  @ViewChildren('mobileNodes') mobileNodes!: QueryList<ElementRef>;

  private scrollTimeout: any;
  private desktopScrollListener: () => void;
  private intersectionObserver?: IntersectionObserver;

  constructor(private zone: NgZone) {
    this.desktopScrollListener = this.onDesktopScroll.bind(this);
  }

  ngAfterViewInit() {
    // Desktop scroll listener
    if (this.timelineContainer) {
      this.timelineContainer.nativeElement.addEventListener('scroll', this.desktopScrollListener);
    }

    // Mobile Intersection Observer
    // The subscription ensures the observer is re-initialized if the list of nodes changes.
    this.mobileNodes.changes.subscribe(() => {
        this.setupIntersectionObserver();
    });
    // A timeout ensures the initial setup happens after the first render cycle.
    setTimeout(() => this.setupIntersectionObserver(), 0);
  }

  ngOnDestroy() {
    if (this.timelineContainer?.nativeElement) {
      this.timelineContainer.nativeElement.removeEventListener('scroll', this.desktopScrollListener);
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    clearTimeout(this.scrollTimeout);
  }

  setupIntersectionObserver() {
    // Clean up any existing observer.
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    // Don't run if the view isn't ready.
    if (!this.mobileTimelineContainer?.nativeElement || this.mobileNodes.length === 0) {
      return;
    }

    const options = {
      root: this.mobileTimelineContainer.nativeElement,
      rootMargin: '0px',
      // A high threshold is best for scroll-snapping, as it ensures the item is
      // mostly centered before triggering.
      threshold: 0.8
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When an entry is intersecting (i.e., centered), update the active node.
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index')!, 10);
          if (!isNaN(index)) {
            // Run the state update inside NgZone to ensure Angular's change detection picks it up.
            this.zone.run(() => {
              this.activeNode = index;
            });
          }
        }
      });
    }, options);

    // Start observing each of the mobile node elements.
    this.mobileNodes.forEach(node => {
      this.intersectionObserver!.observe(node.nativeElement);
    });
  }

  onDesktopScroll() {
    // This logic is for the desktop's custom scroll detection.
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.updateActiveNodeOnDesktopScroll();
    }, 100);
  }

  selectNode(index: number, view: 'desktop' | 'mobile') {
    const nodesList = view === 'desktop' ? this.nodes : this.mobileNodes;
    const nodeElement = nodesList.toArray()[index]?.nativeElement;

    if (nodeElement) {
      // For desktop, we update the state immediately for a responsive feel.
      if (view === 'desktop') {
        this.activeNode = index;
      }
      // For both views, we just scroll the selected node into the center.
      // On mobile, the IntersectionObserver is the SINGLE source of truth and will
      // handle updating the active state when the scroll completes. We do NOT
      // set `activeNode` here for mobile.
      nodeElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }

  updateActiveNodeOnDesktopScroll() {
    // This is the fallback logic for desktop to find the closest node.
    const container = this.timelineContainer.nativeElement;
    if (!container || !this.nodes || this.nodes.length === 0) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestNodeIndex = 0;
    let minDistance = Infinity;

    this.nodes.forEach((node, index) => {
      const nodeEl = node.nativeElement;
      const nodeCenter = nodeEl.offsetLeft + nodeEl.offsetWidth / 2;
      const distance = Math.abs(containerCenter - nodeCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestNodeIndex = index;
      }
    });

    if (this.activeNode !== closestNodeIndex) {
      this.zone.run(() => {
        this.activeNode = closestNodeIndex;
      });
    }
  }
}
