import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AsideComponent } from './aside/aside.component';
import { ValidateSameValueDirective } from './directives/validate-same-value.directive';
import { ValidateWhitespaceDirective } from './directives/validate-whitespace.directive';



@NgModule({
  declarations: [
    HomeComponent,
    AsideComponent,
    ValidateSameValueDirective,
    ValidateWhitespaceDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent,
    AsideComponent,
    ValidateSameValueDirective,
    ValidateWhitespaceDirective
  ]
})
export class SharedModule { }
