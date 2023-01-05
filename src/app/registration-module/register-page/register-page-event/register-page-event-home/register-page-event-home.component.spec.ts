import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageEventHomeComponent } from './register-page-event-home.component';

describe('RegisterPageEventHomeComponent', () => {
  let component: RegisterPageEventHomeComponent;
  let fixture: ComponentFixture<RegisterPageEventHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageEventHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageEventHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
