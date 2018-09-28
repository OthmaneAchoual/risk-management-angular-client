import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkContextTableComponent } from './work-context-table.component';

describe('WorkContextTableComponent', () => {
  let component: WorkContextTableComponent;
  let fixture: ComponentFixture<WorkContextTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkContextTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkContextTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
