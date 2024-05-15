import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: 'people',
        loadChildren: () => import('./people/people.module').then(m => m.PeopleModule)
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
        path: '',
        redirectTo: '/people',
        pathMatch: 'full',
    }
];
