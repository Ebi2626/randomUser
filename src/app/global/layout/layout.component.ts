import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
    standalone: true,
    imports: [MenuComponent],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}
