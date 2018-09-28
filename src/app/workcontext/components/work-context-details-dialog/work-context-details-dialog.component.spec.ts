import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkContextDetailsDialogComponent } from './work-context-details-dialog.component';

describe('WorkContextDetailsDialogComponent', () => {
  let component: WorkContextDetailsDialogComponent;
  let fixture: ComponentFixture<WorkContextDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkContextDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkContextDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
