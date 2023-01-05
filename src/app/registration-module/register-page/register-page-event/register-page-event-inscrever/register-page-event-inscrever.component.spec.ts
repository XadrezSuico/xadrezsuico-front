import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageEventInscreverComponent } from './register-page-event-inscrever.component';

describe('RegisterPageEventInscreverComponent', () => {
  let component: RegisterPageEventInscreverComponent;
  let fixture: ComponentFixture<RegisterPageEventInscreverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageEventInscreverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageEventInscreverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
