import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsForm } from './appointments-form';

describe('AppointmentsForm', () => {
  let component: AppointmentsForm;
  let fixture: ComponentFixture<AppointmentsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
