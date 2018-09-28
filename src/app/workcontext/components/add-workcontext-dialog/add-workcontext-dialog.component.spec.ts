import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkcontextDialogComponent } from './add-workcontext-dialog.component';

describe('AddWorkcontextDialogComponent', () => {
  let component: AddWorkcontextDialogComponent;
  let fixture: ComponentFixture<AddWorkcontextDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkcontextDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkcontextDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
