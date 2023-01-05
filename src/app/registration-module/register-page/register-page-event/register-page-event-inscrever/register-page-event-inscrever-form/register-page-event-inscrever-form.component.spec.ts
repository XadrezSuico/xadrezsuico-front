import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageEventInscreverFormComponent } from './register-page-event-inscrever-form.component';

describe('RegisterPageEventInscreverFormComponent', () => {
  let component: RegisterPageEventInscreverFormComponent;
  let fixture: ComponentFixture<RegisterPageEventInscreverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageEventInscreverFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageEventInscreverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
