import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageEventUpdatePlayerComponent } from './register-page-event-update-player.component';

describe('RegisterPageEventUpdatePlayerComponent', () => {
  let component: RegisterPageEventUpdatePlayerComponent;
  let fixture: ComponentFixture<RegisterPageEventUpdatePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageEventUpdatePlayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageEventUpdatePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
