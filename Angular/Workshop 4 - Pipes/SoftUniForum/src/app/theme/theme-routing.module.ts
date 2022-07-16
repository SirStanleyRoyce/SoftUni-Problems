import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { NewThemeComponent } from './new-theme/new-theme.component';
import { ThemeDetailComponent } from './theme-details/theme-details.component';
import { ThemesComponent } from './themes/themes.component';

const routes: Routes = [
  {
    path: 'create',
    pathMatch: 'full',
    component: NewThemeComponent,
    canActivate: [AuthActivate],
    data: {
      authRequired: true,
      authFailureRedirectUrl: '/user/login'
    }
  },
  {
    path: ':id',
    pathMatch: 'full',
    component: ThemeDetailComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    component: ThemesComponent,
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ThemeRoutingModule { }
