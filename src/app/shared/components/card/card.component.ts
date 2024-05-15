import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, computed, input } from '@angular/core';
import { Person } from '../../models/people.model';
import { StopFetchingDirective } from '../../../people/directives/stop-fetching.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [StopFetchingDirective],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  private _altText = 'Picture of ';
  public person = input<Person>();
  public userAlt = computed(() => this.person() ? `${this._altText} ${this.person()!.firstName} ${this.person()!.lastName}` : '')
  public isPlaceholder = input<boolean>(false); 

  @Output()
  onClickEvent = new EventEmitter<void>()

  public emitClickEvent() {
    this.onClickEvent.emit();
  }
}
