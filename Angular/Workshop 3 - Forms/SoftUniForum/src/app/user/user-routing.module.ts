import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/guards/auth.activate';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: 'login',
        pathMatch: 'full',
        component: LoginComponent,
        canActivate: [AuthActivate],
        data: { authRequired: false }
    },
    {
        path: 'register',
        pathMatch: 'full',
        component: RegisterComponent,
        canActivate: [AuthActivate],
        data: { authRequired: false }
    },
    {
        path: 'profile',
        pathMatch: 'full',
        component: ProfileComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: true,
            authFailureRedirectUrl: '/login'
        }
    },
    {
        path: 'profile/edit',
        pathMatch: 'full',
        component: EditProfileComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: true,
            authFailureRedirectUrl: '/login'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }