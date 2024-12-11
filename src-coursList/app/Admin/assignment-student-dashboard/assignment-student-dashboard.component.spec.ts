import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentStudentDashboardComponent } from './assignment-student-dashboard.component';

describe('AssignmentStudentDashboardComponent', () => {
  let component: AssignmentStudentDashboardComponent;
  let fixture: ComponentFixture<AssignmentStudentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssignmentStudentDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentStudentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
