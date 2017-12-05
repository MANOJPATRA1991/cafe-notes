import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CoffeeComponent } from "./components/coffee/coffee.component";
import { LoginComponent } from "./components/login/login.component";

export const routes: Routes = [
    {
        path: '',
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
        path: 'login',
        component: LoginComponent
    }
];