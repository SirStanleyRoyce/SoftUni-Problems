import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemesComponent } from './themes/themes.component';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDetailComponent } from './theme-details/theme-details.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ThemesComponent, NewThemeComponent, ThemeDetailComponent],
  imports: [
    CommonModule,
    ThemeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class ThemeModule { }
