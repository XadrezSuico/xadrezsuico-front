import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClubFormComponent } from './new-club-form.component';

describe('NewClubFormComponent', () => {
  let component: NewClubFormComponent;
  let fixture: ComponentFixture<NewClubFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewClubFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewClubFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
