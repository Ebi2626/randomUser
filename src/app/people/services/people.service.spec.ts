import { TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PeopleService } from './people.service';
import { HttpClient } from '@angular/common/http';
import { Subject, take, takeUntil, tap } from 'rxjs';

fdescribe('PeopleServiceService', () => {
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
});
