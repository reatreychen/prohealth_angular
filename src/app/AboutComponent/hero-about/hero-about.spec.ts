import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroAbout } from './hero-about';

describe('HeroAbout', () => {
  let component: HeroAbout;
  let fixture: ComponentFixture<HeroAbout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroAbout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroAbout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
