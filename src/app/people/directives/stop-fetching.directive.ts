import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';
import { PeopleService } from '../services/people.service';
import { Subscription, debounceTime, fromEvent } from 'rxjs';

@Directive({
  selector: '[appStopFetching]',
  standalone: true
})
export class StopFetchingDirective implements OnInit, OnDestroy {
  private peopleService: PeopleService = inject(PeopleService);
  private el: ElementRef = inject(ElementRef);
  private sub: Subscription = new Subscription();

  private stopFetchingInterval = () => {
    this.peopleService.stopFetchingInterval();
  }

  private startFetchingInterval = () => {
    this.peopleService.startFetchingInterval();
  }

  ngOnInit() {

    this.sub.add(
      fromEvent(this.el.nativeElement, 'mouseenter').pipe(
        debounceTime(100)
      ).subscribe(() => {
        this.stopFetchingInterval();
      })
    );

    this.sub.add(
      fromEvent(this.el.nativeElement, 'mouseleave').pipe(
        debounceTime(100)
      ).subscribe(() => {
        this.startFetchingInterval();
      })
    );

  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
