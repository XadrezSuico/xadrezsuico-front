import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStateFormComponent } from './new-state-form.component';

describe('NewStateFormComponent', () => {
  let component: NewStateFormComponent;
  let fixture: ComponentFixture<NewStateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewStateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
