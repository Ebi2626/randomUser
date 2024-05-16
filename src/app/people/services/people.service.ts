import { Injectable, OnDestroy, OnInit, inject } from '@angular/core';
import { Person, PersonResponse } from '../../shared/models/people.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, Subscription, debounceTime, exhaustMap, map } from 'rxjs';

interface Cancellable {
  stop: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class PeopleService implements OnDestroy {
  private randomUserApiUrl = `${environment.RANDOM_USER_API}?inc=name,picture`;
  private http: HttpClient = inject(HttpClient);
  private restOfIntervalTime: number | null = null;
  private currentInterval: Cancellable | null = null;
  private fetchPerson$: Subject<void> = new Subject();
  private sub: Subscription = new Subscription();
  public person$: Subject<Person[]> = new Subject();

  constructor() {
    this.sub.add(
      this.fetchPerson$.pipe(
        exhaustMap(() => {
          return this.http.get<PersonResponse>(this.randomUserApiUrl).pipe(
            map<PersonResponse, void>((personResponse: PersonResponse) => {
              const newPerson: Person = {
                firstName: personResponse.results[0].name.first,
                lastName: personResponse.results[0].name.last,
                imgSrc: personResponse.results[0].picture.large
              }
              this.person$.next([newPerson]);
            })
          )
        })
      ).subscribe()
    );
  }

  public getNewPersonAndResetTimer(): void {
    this.restOfIntervalTime = null;
    this.fetchPerson$.next();
  }

  private cancellableInterval(
    fn: (...args: any[]) => any,
    args: any[],
    interval: number,
    restOfIntervalTime: number | null) {
    const startTime = Date.now();

    const boundedFn = fn.bind(this);

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      return this.recallTimeout(boundedFn, args, timeoutId);
    }, restOfIntervalTime || interval);

    return {
      stop: () => {
        const stopTime = Date.now();
        this.restOfIntervalTime = startTime + interval - stopTime;
        clearTimeout(timeoutId);
        this.currentInterval = null;
      }
    }
  }

  private recallTimeout(fn: (...args: any[]) => void, args: any[], timeoutId: ReturnType<typeof setTimeout>) {
    fn(...args);
    this.restOfIntervalTime = null;
    clearInterval(timeoutId);
    this.startFetchingInterval();
  }

  public startFetchingInterval() {
    this.currentInterval = this.cancellableInterval(
      this.getNewPersonAndResetTimer,
      [],
      environment.DEFAULT_RANDOM_USER_INTERVAL,
      this.restOfIntervalTime);
  }

  public stopFetchingInterval() {
      this.currentInterval?.stop();
  }

  ngOnDestroy(): void {
    this.stopFetchingInterval();
    this.sub.unsubscribe();
  }
}
