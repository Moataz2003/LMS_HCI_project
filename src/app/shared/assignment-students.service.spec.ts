import { TestBed } from '@angular/core/testing';

import { AssignmentStudentsService } from './assignment-students.service';

describe('AssignmentStudentsService', () => {
  let service: AssignmentStudentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmentStudentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
