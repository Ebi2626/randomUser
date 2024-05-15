import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Person } from '../../../shared/models/people.model';
import { PeopleService } from '../../services/people.service';
import { CardComponent } from '../../../shared/components/card/card.component';
import { StopFetchingDirective } from '../../directives/stop-fetching.directive';

class MockPeopleService {
  public startFetchingInterval = () => {};
  public getNewPersonAndResetTimer = () => {};
  private mockPerson: Person = {
    firstName: 'John',
    lastName: 'Doe',
    imgSrc: 'https://randomuser.me/api/portraits/women/70.jpg'
  };
  public person$ = of([this.mockPerson]);
}


describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;
  let peopleService: PeopleService;
  let startFetchingIntervalSpy: jasmine.Spy;
  let getNewPersonAndResetTimerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        {
          provide: PeopleService,
          useClass: MockPeopleService
        }
      ],
      imports: [PeopleComponent, CardComponent, StopFetchingDirective]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    peopleService = TestBed.inject(PeopleService);
    startFetchingIntervalSpy = spyOn(peopleService, 'startFetchingInterval');
    getNewPersonAndResetTimerSpy = spyOn(peopleService, 'getNewPersonAndResetTimer');
  });


  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

});
