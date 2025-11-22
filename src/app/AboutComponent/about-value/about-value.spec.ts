import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutValue } from './about-value';

describe('AboutValue', () => {
  let component: AboutValue;
  let fixture: ComponentFixture<AboutValue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutValue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutValue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
