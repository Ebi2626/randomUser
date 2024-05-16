import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeopleService } from './people.service';
import { HttpClient } from '@angular/common/http';
import { Person, mockResponse } from '../../shared/models/people.model';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../environments/environment';

describe('PeopleServiceService', () => {
  let service: PeopleService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(PeopleService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should reset restOfIntervalTime on getNewPersonAndRestTimer call', fakeAsync(() => {
    //// Arrange
    service['restOfIntervalTime'] = 1000;
    const getNewPersonAndResetTimerSpy = spyOn(service, 'getNewPersonAndResetTimer').and.callThrough();

    //// Act
    service.getNewPersonAndResetTimer();

    //// Assert
    tick(400);
    expect(getNewPersonAndResetTimerSpy).toHaveBeenCalled();
    expect(service['restOfIntervalTime']).toBeNull();
    flush();
  }));

  describe('private method "cancellableInterval"', () => {
    it('should return Cancellable with stop method to break the current timeout fn', () => {
      //// Arrange
      const fn = (...args: any[]) => { console.log(this) };
      const args: any[] = [];
      const interval = 100;
      const restOfIntervalTime = null;

      //// Act
      const cancellableFn = service['cancellableInterval'](fn, args, interval, restOfIntervalTime)

      //// Assert
      expect(cancellableFn.stop).toBeDefined();
      cancellableFn.stop();
    });
  });

  describe('startFetchingInterval method', () => {
    it('should save ref to current interval in private field', () => {
      //// Act
      service.startFetchingInterval();

      //// Assert
      const fieldWithIntervalRef = service['currentInterval'];
      expect(fieldWithIntervalRef).toBeDefined();
    });

    it('should call getNewPersonAndResetTimer method after given time', fakeAsync(() => {
      //// Arrange
      const getNewPersonAndResetTimerSpy = spyOn(service, 'getNewPersonAndResetTimer');

      //// Act
      service.startFetchingInterval();
      tick(5000);

      //// Assert
      service.stopFetchingInterval();
      flush();
      expect(getNewPersonAndResetTimerSpy).toHaveBeenCalledTimes(1);
    }));

    it('should not getNewPersonAndResetTimer method before given time', fakeAsync(() => {
      //// Arrange
      const getNewPersonAndResetTimerSpy = spyOn(service, 'getNewPersonAndResetTimer');

      //// Act
      service.startFetchingInterval();
      tick(4999);

      //// Assert
      service.stopFetchingInterval();
      flush();
      expect(getNewPersonAndResetTimerSpy).not.toHaveBeenCalled();
    }));

    it('should save rest of given time after calling stopFetchingMethod', fakeAsync(() => {
      //// Act
      service.startFetchingInterval();
      tick(4101);
      service.stopFetchingInterval();
      
      //// Assert
      const restOfIntervalTime = service['restOfIntervalTime'];
      expect(restOfIntervalTime).toBe(899);
    }));

    it('should clear currentInterval on stopFetching method call', fakeAsync(() => {
      //// Act I
      service.startFetchingInterval();
      tick(5000);

      //// Assert I
      const serviceCurrentInterval1 = service['currentInterval'];
      expect(serviceCurrentInterval1).not.toBeNull();

      //// Act II
      service.stopFetchingInterval();
      tick();

      //// Assert II
      const serviceCurrentInterval2 = service['currentInterval'];
      expect(serviceCurrentInterval2).toBeNull();
    }));

    it('should keep calling getNewPersonAndResetTimer method until destroy while not stopped', fakeAsync(() => {
      //// Arrange
      const getNewPersonAndResetTimerSpy = spyOn(service, 'getNewPersonAndResetTimer').and.callThrough();

      //// Act
      service.startFetchingInterval();
      tick(20001);

      //// Assert
      service.ngOnDestroy();
      expect(getNewPersonAndResetTimerSpy).toHaveBeenCalledTimes(4);
    }));

    it('should make httpRequest each 5s and map response to Person interface', fakeAsync(() => {
      //// Arrange
      const expectedUrl = `${environment.RANDOM_USER_API}?inc=name,picture`;
      const destroy$ = new Subject<void>();
      const expectedPerson: Person = {
        firstName: mockResponse.results[0].name.first,
        lastName: mockResponse.results[0].name.last,
        imgSrc: mockResponse.results[0].picture.large,
      };
      const results = [];
      service.person$.pipe(takeUntil(destroy$)).subscribe((data) => {
        expect(data[0]).toEqual(expectedPerson);
        results.push(data[0]);
      });

      //// Act
      service.startFetchingInterval();
      
      tick(5000);
      const request1 = httpTestingController.expectOne(expectedUrl);
      request1.flush({...mockResponse});

      tick(5000);
      const request2 = httpTestingController.expectOne(expectedUrl);
      request2.flush({...mockResponse});

      tick(5000);
      const request3 = httpTestingController.expectOne(expectedUrl);
      request3.flush({...mockResponse});

      tick(100);
      
      service.stopFetchingInterval();

      //// Assert
      destroy$.next();
      destroy$.complete();
      httpTestingController.verify();
      expect(results.length).toBe(3);
      flush();
    }));


  });
});
