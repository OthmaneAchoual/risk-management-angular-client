import { TestBed, inject } from '@angular/core/testing';

import { WorkContextService } from './work-context.service';

describe('WorkContextService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkContextService]
    });
  });

  it('should be created', inject([WorkContextService], (service: WorkContextService) => {
    expect(service).toBeTruthy();
  }));
});
