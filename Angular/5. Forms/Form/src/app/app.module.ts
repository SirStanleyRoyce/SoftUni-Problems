import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TemplateDrivenFormComponent } from './template-driven-form/template-driven-form.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateUsernameDirective } from './directives/validate-username/validate-username.directive';
import { ValidateUrlDirective } from './directives/validate-url/validate-url.directive';
import { ValidateSameValueDirective } from './directives/validate-same-value/validate-same-value.directive';

@NgModule({
  declarations: [
    AppComponent,
    TemplateDrivenFormComponent,
    ReactiveFormComponent,
    ValidateUsernameDirective,
    ValidateUrlDirective,
    ValidateSameValueDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
