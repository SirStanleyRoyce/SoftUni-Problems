import { Component, Input } from '@angular/core';
import { IPost } from '../../interfaces/post';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  @Input() title!: string;
  @Input() items: IPost[] | undefined;
}