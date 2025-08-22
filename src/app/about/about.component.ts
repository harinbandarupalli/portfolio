import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  aboutContent: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.aboutContent = data.about;
    });
  }
}
