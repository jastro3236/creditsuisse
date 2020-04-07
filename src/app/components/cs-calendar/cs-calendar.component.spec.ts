import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsCalendarComponent } from './cs-calendar.component';

describe('CsCalendarComponent', () => {
  let component: CsCalendarComponent;
  let fixture: ComponentFixture<CsCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
