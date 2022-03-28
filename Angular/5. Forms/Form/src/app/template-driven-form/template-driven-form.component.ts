import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven-form',
  templateUrl: './template-driven-form.component.html',
  styleUrls: ['./template-driven-form.component.css']
})

export class TemplateDrivenFormComponent {
  @ViewChild('form') form!: NgForm;
  tels = [
    { value: 359 },
    { value: 444 },
    { value: 971 },
    { value: 111 },
    {
      value: 888,
      default: true
    },
    { value: 392 },
    { value: 152 }
  ]
  occupations = [
    {
      value: 'Not specified',
      default: true
    },
    { value: 'Student' },
    { value: 'Worker' },
    { value: 'Designer' },
    { value: 'Programmer' },
    { value: 'Entrepreneur' },
    { value: 'None' }
  ]

  submitHandler(): void {
    if (this.form.valid)
      this.form.reset();
  }
}