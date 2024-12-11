import { Component, OnInit } from '@angular/core';
import { GradingService } from '../../shared/grading.service';
import { CourseService } from '../../shared/course.service';
import { AuthService } from '../../shared/auth.service';
import { Course } from '../../Admin/course-management/course-management.component';

@Component({
  selector: 'app-grading',
  templateUrl: './grading.component.html',
  styleUrls: ['./grading.component.css'],
})
export class GradingComponent implements OnInit {
  title = 'Grade Student Assignment';
  instructorCourses: Course[] = [];
  selectedCourseId: string | null = null;
  assessments: any[] = [];
  selectedAssessmentId: string | null = null;
  students: any[] = [];
  selectedStudentId: string | null = null;
  grade: number | null = null;
  loggedInUserId: string | null = null;

  constructor(
    private gradingService: GradingService,
    private courseService: CourseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLoggedInUser();
  }

  // Load logged-in user's courses
  async loadLoggedInUser() {
    try {
      const userId = await this.auth.getLoggedInUserId();
      if (userId) {
        this.loggedInUserId = userId;
        this.loadInstructorCourses(userId);
      }
    } catch (error) {
      console.error('Failed to fetch logged-in user ID', error);
    }
  }

  loadInstructorCourses(instructorId: string): void {
    this.courseService.getCoursesForInstructor(instructorId).subscribe({
      next: (courses) => {
        this.instructorCourses = courses || [];
      },
      error: (error) => console.error('Error loading instructor courses', error),
    });
  }

  onCourseSelect(): void {
    if (this.selectedCourseId) {
      this.gradingService.getAssessmentsForCourse(this.selectedCourseId).subscribe({
        next: (assessments) => {
          this.assessments = assessments || [];
        },
        error: (error) => console.error('Error loading assessments', error),
      });
    }
  }
//grading
  onAssessmentSelect(): void {
    if (this.selectedAssessmentId) {
      this.gradingService.getSubmittedStudents(this.selectedAssessmentId).subscribe({
        next: (students) => {
          this.students = students || [];
        },
        error: (error) => console.error('Error loading student submissions', error),
      });
    }
  }

  assignGrade(): void {
    if (this.selectedCourseId && this.selectedAssessmentId && this.selectedStudentId && this.grade !== null) {
      this.gradingService
        .updateStudentGrade(this.selectedCourseId, this.selectedAssessmentId, this.selectedStudentId, this.grade)
        .then(() => {
          alert('Grade assigned successfully!');
          this.grade = null;
        })
        .catch((error) => {
          console.error('Error assigning grade:', error);
          alert('Failed to assign grade.');
        });
    } else {
      alert('Please ensure all fields are filled in.');
    }
  }
}
