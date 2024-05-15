import { Route, RouterModule } from "@angular/router";
import { PeopleComponent } from "./components/people/people.component";
import { NgModule } from "@angular/core";

const routes: Route[] = [
    {
        path: '',
        component: PeopleComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PeopleRoutingModule {};