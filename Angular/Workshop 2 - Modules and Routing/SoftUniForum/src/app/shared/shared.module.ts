import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AsideComponent } from './aside/aside.component';



@NgModule({
  declarations: [
    HomeComponent,
    AsideComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    AsideComponent
  ]
})
export class SharedModule { }
