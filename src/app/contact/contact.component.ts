import { Component, OnInit } from '@angular/core';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isSubmitting = false;
  contactContent: any;
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getContent().subscribe(data => {
      this.contactContent = data.contact;
    });
  }

  handleSubmit() {
    this.isSubmitting = true;
    console.log('Form submitted:', this.formData);

    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I\'ll get back to you soon.');
      this.formData = { name: '', email: '', subject: '', message: '' };
      this.isSubmitting = false;
    }, 2000);
  }
}
