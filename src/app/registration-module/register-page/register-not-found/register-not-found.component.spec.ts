import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNotFoundComponent } from './register-not-found.component';

describe('RegisterNotFoundComponent', () => {
  let component: RegisterNotFoundComponent;
  let fixture: ComponentFixture<RegisterNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterNotFoundComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
