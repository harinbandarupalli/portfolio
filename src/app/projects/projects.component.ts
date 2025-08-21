import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('track') track!: ElementRef;

  private currentIndex = 1;
  private slideWidth!: number;
  private intervalId: any;
  private slides: any[] = [];
  private scrollSubscription!: Subscription;

  @HostListener('window:resize')
  onResize() {
    this.updateSlideWidth();
    this.track.nativeElement.style.transition = 'none';
    this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
  }

  constructor(
    private scrollService: ScrollService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(sectionId => {
      if (sectionId === 'projects') {
        this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupCarousel();
    });
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }

  updateSlideWidth(): void {
    this.slideWidth = this.carousel.nativeElement.clientWidth;
  }

  setupCarousel(): void {
    const originalSlides = Array.from(this.track.nativeElement.children);
    if (originalSlides.length <= 1) return;

    const firstClone = (originalSlides[0] as HTMLElement).cloneNode(true);
    const lastClone = (originalSlides[originalSlides.length - 1] as HTMLElement).cloneNode(true);

    this.track.nativeElement.append(firstClone);
    this.track.nativeElement.prepend(lastClone);

    this.slides = Array.from(this.track.nativeElement.children);
    this.updateSlideWidth();

    this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;

    this.startAutoScroll();
  }

  moveToSlide(index: number): void {
    if (!this.track) return;
    this.track.nativeElement.style.transition = 'transform 0.5s ease-in-out';
    this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * index}px)`;
    this.currentIndex = index;
  }

  nextSlide(): void {
    this.moveToSlide(this.currentIndex + 1);
  }

  prevSlide(): void {
    this.moveToSlide(this.currentIndex - 1);
  }

  handleManualNavigation(direction: 'next' | 'prev'): void {
    this.stopAutoScroll();
    if (direction === 'next') {
      this.nextSlide();
    } else {
      this.prevSlide();
    }
    this.startAutoScroll();
  }

  onTransitionEnd(): void {
    if (this.currentIndex === 0) {
      this.track.nativeElement.style.transition = 'none';
      this.currentIndex = this.slides.length - 2;
      this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }

    if (this.currentIndex >= this.slides.length - 1) {
      this.track.nativeElement.style.transition = 'none';
      this.currentIndex = 1;
      this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }
  }

  startAutoScroll(): void {
    this.stopAutoScroll();
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoScroll(): void {
    clearInterval(this.intervalId);
  }
}
