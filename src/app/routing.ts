import { Routes } from "@angular/router";
import { ListComponent } from "./components/list/list.component";
import { CoffeeComponent } from "./components/coffee/coffee.component";

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
    }
];