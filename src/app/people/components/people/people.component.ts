import { ChangeDetectionStrategy, Component, Inject, OnInit, inject, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { PeopleService } from '../../services/people.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [CardComponent],
  providers: [PeopleService],
  templateUrl: './people.component.html',
  styleUrl: './people.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleComponent  {
  private peopleService: PeopleService = inject(PeopleService);

  public person = toSignal(this.peopleService.person$);

  public fetchNewData() {
    this.peopleService.getNewPersonAndResetTimer();
  }

  ngOnInit(): void {
    console.log('onInit');
    this.fetchNewData();
    this.peopleService.startFetchingInterval();
  }
}

