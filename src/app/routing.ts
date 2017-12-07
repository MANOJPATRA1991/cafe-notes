import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CoffeeComponent } from "./components/coffee/coffee.component";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EmailComponent } from './components/email/email.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'list', 
        pathMatch: 'full' 
    },
    {
        path: 'list',
        component: ListComponent
    },
    {
        path: 'coffee',
        component: CoffeeComponent
    },
    {
        path: 'coffee/:id',
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