import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { CourseService } from '../../shared/course.service';

@Component({
  selector: 'app-progress-tracker',
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {
  studentCourses: any[] = []; // Array to hold courses assigned to the student
  loggedInUserId: string | null = null; // Logged-in student's user ID

  constructor(
    private auth: AuthService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadLoggedInUser(); // Load the logged-in student's data on component initialization
  }

  async loadLoggedInUser(): Promise<void> {
    try {
      const userId = await this.auth.getLoggedInUserId(); // Get the logged-in user ID
      if (userId) {
        this.loggedInUserId = userId;
        this.loadStudentCourses(userId); // Load courses assigned to the student
      }
    } catch (error) {
      console.error('Failed to fetch logged-in user ID', error);
    }
  }

  loadStudentCourses(studentId: string): void {
    this.courseService.getCoursesForStudent(studentId).subscribe({
      next: (courses) => {
        console.log('Fetched Courses:', courses); // Log full response
        this.studentCourses = courses.map((course) => ({
          id: course.id,
          title: course.title,
          grade: course.grades || 0
        }));
        console.log('Mapped Student Courses:', this.studentCourses); // Log processed data
      },
      error: (error) => console.error('Error loading student courses', error),
    });
  }


}


