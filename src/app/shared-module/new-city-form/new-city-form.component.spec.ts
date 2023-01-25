import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCityFormComponent } from './new-city-form.component';

describe('NewCityFormComponent', () => {
  let component: NewCityFormComponent;
  let fixture: ComponentFixture<NewCityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCityFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
