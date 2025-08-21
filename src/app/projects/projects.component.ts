import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.setupCarousel();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  setupCarousel(): void {
    const slides = Array.from(this.track.nativeElement.children);
    if (slides.length === 0) return;

    const firstClone = (slides[0] as HTMLElement).cloneNode(true);
    const lastClone = (slides[slides.length - 1] as HTMLElement).cloneNode(true);

    this.track.nativeElement.append(firstClone);
    this.track.nativeElement.prepend(lastClone);

    this.slideWidth = (slides[0] as HTMLElement).getBoundingClientRect().width;
    this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;

    this.startAutoScroll();
  }

  moveToSlide(index: number): void {
    this.track.nativeElement.style.transition = 'transform 0.5s ease-in-out';
    this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * index}px)`;
    this.currentIndex = index;
  }

  nextSlide(): void {
    this.moveToSlide(this.currentIndex + 1);
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  prevSlide(): void {
    this.moveToSlide(this.currentIndex - 1);
    this.stopAutoScroll();
    this.startAutoScroll();
  }

  onTransitionEnd(): void {
    const slides = Array.from(this.track.nativeElement.children);
    if (this.currentIndex === 0) {
      this.track.nativeElement.style.transition = 'none';
      this.currentIndex = slides.length - 2;
      this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }
    if (this.currentIndex === slides.length - 1) {
      this.track.nativeElement.style.transition = 'none';
      this.currentIndex = 1;
      this.track.nativeElement.style.transform = `translateX(-${this.slideWidth * this.currentIndex}px)`;
    }
  }

  startAutoScroll(): void {
    this.intervalId = setInterval(() => {
      this.moveToSlide(this.currentIndex + 1);
    }, 5000);
  }

  stopAutoScroll(): void {
    clearInterval(this.intervalId);
  }
}
