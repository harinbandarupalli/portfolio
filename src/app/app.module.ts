import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { HeroModule } from './hero/hero.module';
import { AboutModule } from './about/about.module';
import { ProjectsModule } from './projects/projects.module';
import { SocialsModule } from './socials/socials.module';
import { FooterModule } from './footer/footer.module';
import { ExperienceModule } from './experience/experience.module'; // Import the new module

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        HeaderModule,
        HeroModule,
        AboutModule,
        ExperienceModule, // Add the new module here
        ProjectsModule,
        SocialsModule,
        FooterModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }