import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkContextDetailsComponent } from './work-context-details.component';

describe('WorkContextDetailsComponent', () => {
  let component: WorkContextDetailsComponent;
  let fixture: ComponentFixture<WorkContextDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkContextDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkContextDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
