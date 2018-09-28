import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWorkContextComponent } from './add-work-context.component';

describe('AddWorkContextComponent', () => {
  let component: AddWorkContextComponent;
  let fixture: ComponentFixture<AddWorkContextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddWorkContextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWorkContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
