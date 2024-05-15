import { Directive, HostListener, inject } from '@angular/core';
import { PeopleService } from '../services/people.service';

@Directive({
  selector: '[appStopFetching]',
  standalone: true
})
export class StopFetchingDirective {
  private peopleService: PeopleService = inject(PeopleService);

  @HostListener('mouseenter') stopInterval() {
    this.peopleService.stopFetchingInterval();
  }

  @HostListener('mouseleave') runInterval() {
    this.peopleService.startFetchingInterval();
  }
}
