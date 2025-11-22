import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerAppointments } from './banner-appointments';

describe('BannerAppointments', () => {
  let component: BannerAppointments;
  let fixture: ComponentFixture<BannerAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerAppointments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
