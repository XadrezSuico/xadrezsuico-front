import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageEventRegistrationListComponent } from './register-page-event-registration-list.component';

describe('RegisterPageEventRegistrationListComponent', () => {
  let component: RegisterPageEventRegistrationListComponent;
  let fixture: ComponentFixture<RegisterPageEventRegistrationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageEventRegistrationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageEventRegistrationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
