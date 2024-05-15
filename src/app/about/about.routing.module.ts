import { Route, RouterModule } from "@angular/router";
import { AboutComponent } from "./components/about/about.component";
import { NgModule } from "@angular/core";

const routes: Route[] = [
    {
        path: '',
        component: AboutComponent
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AboutRoutingModule {};