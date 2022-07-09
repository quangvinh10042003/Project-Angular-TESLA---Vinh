import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaAboutComponent } from './tesla-about.component';

describe('TeslaAboutComponent', () => {
  let component: TeslaAboutComponent;
  let fixture: ComponentFixture<TeslaAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeslaAboutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeslaAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
