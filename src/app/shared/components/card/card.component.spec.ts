import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';
import { provideHttpClient } from '@angular/common/http';
import { ComponentRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/people.model';

const mockPerson: Person = {
  firstName: "John",
  lastName: "Doe",
  imgSrc: "https://randomuser.me/api/portraits/women/70.jpg"
}

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let componentRef: ComponentRef<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('As placeholder', () => {
    beforeEach(() => {
      componentRef.setInput('isPlaceholder', true);
      fixture.detectChanges();
    });

    it('Should have not any images', () => {
      //// Arrange
      const expectedResult = null;

      //// Act
      const result = fixture.debugElement.query(By.css('img'));

      //// Assert
      expect(result).toEqual(expectedResult as any);
    });

    it('Should have disabled button', () => {
      //// Act
      const button = fixture.debugElement.query(By.css('button'));

      //// Assert
      expect(button.nativeElement.disabled).toBeTruthy();
    });
  });

  describe('As a card with data', () => {
    beforeEach(() => {

      componentRef.setInput('isPlaceholder', false);
      componentRef.setInput('person', mockPerson);
      fixture.detectChanges();
    });

    it('should display img with given src', () => {
      //// Arrange
      const expectedSrc = mockPerson.imgSrc;

      //// Act
      const img = fixture.debugElement.query(By.css('img'))
      const src = img.nativeElement.getAttribute('src');

      //// Assert
      expect(img).toBeTruthy();
      expect(src).toEqual(expectedSrc);
    });

    it('should display img with given alt', () => {
      //// Arrange
      const expectedAlt = `Picture of ${mockPerson.firstName} ${mockPerson.lastName}`;

      //// Act
      const img = fixture.debugElement.query(By.css('img'))
      const src = img.nativeElement.getAttribute('alt');

      //// Assert
      expect(src).toEqual(expectedAlt);
    });

    it('should display header with given user first name and last name', () => {
      //// Arrange
      const expectedHeaderContent = `${mockPerson.firstName} ${mockPerson.lastName}`;

      //// Act
      const header = fixture.debugElement.query(By.css('h2'));
      const headerContent = header.nativeElement.innerText;

      //// Assert
      expect(headerContent).toEqual(expectedHeaderContent);
    });

    it('should emit event on button click', () => {
      //// Arrange
      const emitterSpy = spyOn(component, 'emitClickEvent');
      const button = fixture.debugElement.query(By.css('button'));
      
      //// Act
      button.nativeElement.click();

      //// Assert
      expect(emitterSpy).toHaveBeenCalled();
    });
  })
});
