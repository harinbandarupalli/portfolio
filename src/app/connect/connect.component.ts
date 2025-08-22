import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  connectContent: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.connectContent = data.connect;
    });
  }
}
