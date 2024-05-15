import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StopFetchingDirective } from './stop-fetching.directive';
import { Component, Injector } from '@angular/core';
import { Person } from '../../shared/models/people.model';
import { of } from 'rxjs';
import { PeopleService } from '../services/people.service';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

class MockPeopleService {
  public startFetchingInterval = () => {};
  public stopFetchingInterval = () => {};
}

@Component({
  template: `<h1 appStopFetching>Test</h1>`,
  selector: 'app-mock-component',
  standalone: true,
  imports: [StopFetchingDirective],
})
class MockComponent {}

describe('StopFetchingDirective', () => {
  let fixture: ComponentFixture<MockComponent>;
  let directive: StopFetchingDirective;
  let peopleService: PeopleService;
  let stopFetchingIntervalSpy: jasmine.Spy;
  let startFetchingIntervalSpy: jasmine.Spy;

  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [StopFetchingDirective, MockComponent],
      providers: [
        CommonModule,
        {
          provide: PeopleService,
          useClass: MockPeopleService,
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
    directive = fixture.debugElement.query(By.directive(StopFetchingDirective)).componentInstance;
    peopleService = TestBed.inject(PeopleService);
    stopFetchingIntervalSpy = spyOn(peopleService, 'stopFetchingInterval');
    startFetchingIntervalSpy = spyOn(peopleService, 'startFetchingInterval');
  })

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should call stopFetchingInterval from PeopleService on mouse enter', () => {
    //// Arrange
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    const mouseEnterEvent = new Event('mouseenter'); 

    //// Act
    h1.dispatchEvent(mouseEnterEvent);

    //// Assert
    expect(stopFetchingIntervalSpy).toHaveBeenCalled();
  });

  it('should call startFetchingInterval from PeopleService on mouse leave', () => {
    //// Arrange
    const h1 = fixture.debugElement.query(By.css('h1')).nativeElement;
    const mouseEnterEvent = new Event('mouseleave'); 

    //// Act
    h1.dispatchEvent(mouseEnterEvent);

    //// Assert
    expect(startFetchingIntervalSpy).toHaveBeenCalled();
  });


});
