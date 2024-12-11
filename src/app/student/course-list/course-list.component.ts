// course-list.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from '../../shared/course.service';
import { AuthService } from '../../shared/auth.service';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  courses: any[] = []; // This will hold the courses for the logged-in student
  loggedInUserId: string | null = null; // Simulate getting the logged-in user ID (replace with your logic)
  studentCourses$: Observable<any[]> | undefined;
  selectedCourseId: string | null = null;

  constructor(@Inject(CourseService) private courseService: CourseService, private auth: AuthService) {}

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
      return;
    }

    this.studentCourses$ = this.courseService.getCoursesForStudent(this.loggedInUserId);
    this.studentCourses$.subscribe({
      next: (courses) => {
        console.log('Courses fetched:', courses);
        this.courses = courses; // Bind fetched courses
        if (courses.length > 0) {
          this.selectedCourseId = courses[0]?.id; // Preselect the first available course
        }
      },
      error: (error) => {
        console.error('Error fetching enrolled courses', error);
      },
    });
  }
}
