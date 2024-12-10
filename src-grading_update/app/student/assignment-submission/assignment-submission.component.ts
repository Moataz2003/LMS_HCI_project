import { Student } from './../../instructor/course-creation/course-creation.component';
import { Component ,OnInit} from '@angular/core';
import { GradingService } from '../../shared/grading.service';
import { AuthService } from '../../shared/auth.service';
import { Course } from '../../Admin/course-management/course-management.component';
import { CourseService } from '../../shared/course.service';
import { Observable } from 'rxjs';
import { Assessment } from './../../instructor/course-creation/course-creation.component';
import { User } from '../../Admin/user-management/user-management.component';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-assignment-submission',
  templateUrl: './assignment-submission.component.html',
  styleUrl: './assignment-submission.component.css'
})
export class AssignmentSubmissionComponent implements OnInit {
  studentAssessments: any[] = [];
  gradeToSubmit: number | null = null;
  courses: Course[] = [];
  assessments: any[] = [];
  selectedCourseId: string | null = null;
  selectedAssessmentId: string | null = null;
  loggedInUserId: string | null = null;
  grade: number | null = null;
  studentCourses: Course[] = [];
  studentCourses$!: Observable<Course[]>;
  enrolledCourses$: Observable<Course[]> | null = null;
  assessments$: Observable<Assessment[]> | null = null;
  loggedInUser: User | null = null;
  submissionSuccess = false;
  constructor(private gradingService: GradingService, private auth: AuthService,private courseService: CourseService) {}

  ngOnInit(): void {
    this.initializeComponent();
  }

  async initializeComponent() {
    try {
      this.loggedInUserId = await this.auth.getLoggedInUserId();
      if (this.loggedInUserId) {
        this.loadStudentCourses();
      }
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async loadStudentCourses(): Promise<void> {
    if (!this.loggedInUserId) {
      console.error('Logged-in user ID is invalid');
      return;}

    this.studentCourses$ = this.courseService.getCoursesForStudent(this.loggedInUserId);
    this.studentCourses$.subscribe({
      next: (courses) => {
        console.log('Courses fetched:', courses);
        this.courses = courses; // Bind fetched courses
        if (courses.length > 0) {
          this.selectedCourseId = courses[0]?.id; // Preselect the first available course
          this.onCourseSelect({ target: { value: this.selectedCourseId } });
        }
      },
      error: (error) => {
        console.error('Error fetching enrolled courses', error);
      },
    });
  }

  onCourseSelect(event: any): void {
    this.selectedCourseId = event.target.value;
    this.loadAssessments(); // Load assessments based on course selection
  }

  async loadAssessments() {
    if (!this.selectedCourseId) return;

    try {
      this.assessments = await firstValueFrom(
        this.gradingService.getAssessmentsForCourse(this.selectedCourseId)
      );
    } catch (error) {
      console.error('Error fetching assessments for course', error);
    }
  }

  submitAssignment(): void {
    if (!this.selectedCourseId || !this.selectedAssessmentId) {
      alert('Please select a course and an assessment to submit.');
      return;
    }

    this.gradingService
      .submitAssessment(this.selectedCourseId, this.selectedAssessmentId, this.loggedInUserId!)
      .then(() => {
        alert('Assessment submitted successfully!');
        this.submissionSuccess = true;
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('There was an issue submitting the assessment.');
      });
  }
  resetForm() {
    this.selectedCourseId = null;
    this.selectedAssessmentId = null;
    this.submissionSuccess = false;
  }
}
