import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurValue } from './our-value';

describe('OurValue', () => {
  let component: OurValue;
  let fixture: ComponentFixture<OurValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurValue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurValue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
