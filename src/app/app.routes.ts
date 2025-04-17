import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DasboadComponent } from './pages/dasboad/dasboad.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'dasboad',
        component: DasboadComponent
    },
    {
        path:'app-add-user',
        component: AddUserComponent
    },
    {
        path:'app-edit-user/:id',
        component: EditUserComponent
    }
];
