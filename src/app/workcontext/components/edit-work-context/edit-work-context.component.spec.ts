import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkContextComponent } from './edit-work-context.component';

describe('EditWorkContextComponent', () => {
  let component: EditWorkContextComponent;
  let fixture: ComponentFixture<EditWorkContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
