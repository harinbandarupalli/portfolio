import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LucideAngularModule, Menu, X, ChevronLeft, ChevronRight, Download, ExternalLink, Mail, Github, Linkedin, MapPin, Calendar } from 'lucide-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';
import { ConnectComponent } from './connect/connect.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ExperienceComponent,
    ProjectsComponent,
    ConnectComponent,
    ContactComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    LucideAngularModule.pick({ Menu, X, ChevronLeft, ChevronRight, Download, ExternalLink, Mail, Github, Linkedin, MapPin, Calendar })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
