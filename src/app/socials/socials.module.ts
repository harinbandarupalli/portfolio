import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialsComponent } from './socials.component';

@NgModule({
  declarations: [SocialsComponent],
  imports: [
    CommonModule
  ],
  exports: [SocialsComponent]
})
export class SocialsModule { }