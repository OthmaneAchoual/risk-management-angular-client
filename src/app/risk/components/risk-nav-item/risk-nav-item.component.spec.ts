import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskNavItemComponent } from './risk-nav-item.component';

describe('RiskNavItemComponent', () => {
  let component: RiskNavItemComponent;
  let fixture: ComponentFixture<RiskNavItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RiskNavItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskNavItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
