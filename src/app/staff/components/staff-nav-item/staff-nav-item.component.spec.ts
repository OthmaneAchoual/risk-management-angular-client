import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNavItemComponent } from './staff-nav-item.component';

describe('StaffNavItemComponent', () => {
  let component: StaffNavItemComponent;
  let fixture: ComponentFixture<StaffNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
