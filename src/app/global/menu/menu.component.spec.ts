import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { PreloadAllModules, Route, RouterModule, } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from '@angular/platform-browser';
import { routes } from '../../app.routes';


@Component({
  selector: 'app-test-component',
  standalone: true,
  template: `<h1>Test</h1>`
})
class TestComponent{}

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterModule.forRoot(routes, {
          onSameUrlNavigation: "ignore",
          preloadingStrategy: PreloadAllModules
        }),
        MenuComponent, 
        TitleCasePipe,
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should displaying only routes with not empty paths', () => {
    //// Arrange
    const expectedPaths = ['People', 'About'];
    const expectedNumberOfElements = 2;

    //// Act
    const allHrefs = fixture.debugElement.queryAll(By.css('a')); 

    //// Assert
    expect(allHrefs.length).toBe(expectedNumberOfElements);
    expect(allHrefs.map((el) => el.nativeElement.innerText)).toEqual(expectedPaths);
  })
});
