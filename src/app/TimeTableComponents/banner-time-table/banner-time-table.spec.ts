import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerTimeTable } from './banner-time-table';

describe('BannerTimeTable', () => {
  let component: BannerTimeTable;
  let fixture: ComponentFixture<BannerTimeTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerTimeTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerTimeTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
