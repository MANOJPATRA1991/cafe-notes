import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CoffeeComponent } from "./components/coffee/coffee.component";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmailComponent } from './components/email/email.component';
import { ActivateGuard } from './guards/activate.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login', 
        pathMatch: 'full' 
    },
    {
        path: 'list',
        canActivate: [ActivateGuard],
        component: ListComponent
    },
    {
        path: 'coffee',
        canActivate: [ActivateGuard],
        component: CoffeeComponent
    },
    {
        path: 'coffee/:id',
        canActivate: [ActivateGuard],
        component: CoffeeComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'login-email',
        component: EmailComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];