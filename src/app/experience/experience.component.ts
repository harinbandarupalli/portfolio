import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  selectedExperience = 0;
  experienceContent: any;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.experienceContent = data.experience;
    });
  }

  selectExperience(index: number) {
    this.selectedExperience = index;
  }
}
