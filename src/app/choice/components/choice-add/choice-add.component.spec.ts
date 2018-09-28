import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoiceAddComponent } from './choice-add.component';

describe('ChoiceAddComponent', () => {
  let component: ChoiceAddComponent;
  let fixture: ComponentFixture<ChoiceAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoiceAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoiceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
