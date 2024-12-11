import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMonitoringComponent } from './student-monitoring.component';

describe('StudentMonitoringComponent', () => {
  let component: StudentMonitoringComponent;
  let fixture: ComponentFixture<StudentMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StudentMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
