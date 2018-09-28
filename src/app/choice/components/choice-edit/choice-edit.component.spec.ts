import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceEditComponent } from './choice-edit.component';

describe('ChoiceEditComponent', () => {
  let component: ChoiceEditComponent;
  let fixture: ComponentFixture<ChoiceEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
