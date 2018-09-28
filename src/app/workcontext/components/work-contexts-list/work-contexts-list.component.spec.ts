import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkContextsListComponent } from './work-contexts-list.component';

describe('WorkContextsListComponent', () => {
  let component: WorkContextsListComponent;
  let fixture: ComponentFixture<WorkContextsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkContextsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkContextsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
