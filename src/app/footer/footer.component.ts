import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  footerContent: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.footerContent = data.footer;
    });
  }
}
