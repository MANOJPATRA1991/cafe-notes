import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CoffeeComponent } from "./components/coffee/coffee.component";

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
    }
];