import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsDropdownComponent } from './cs-dropdown.component';

describe('CsDropdownComponent', () => {
  let component: CsDropdownComponent;
  let fixture: ComponentFixture<CsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
