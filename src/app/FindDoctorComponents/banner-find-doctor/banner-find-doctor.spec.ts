import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFindDoctor } from './banner-find-doctor';

describe('BannerFindDoctor', () => {
  let component: BannerFindDoctor;
  let fixture: ComponentFixture<BannerFindDoctor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerFindDoctor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerFindDoctor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
