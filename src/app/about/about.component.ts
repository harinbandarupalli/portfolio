import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../scroll.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  private scrollSubscription!: Subscription;

  constructor(
    private scrollService: ScrollService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.scrollSubscription = this.scrollService.scrollToSection$.subscribe(sectionId => {
      if (sectionId === 'about') {
        this.elementRef.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
