import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { AuthService } from '../../shared/auth.service';
import { Student } from '../course-creation/course-creation.component';

@Component({
  selector: 'app-student-monitoring',
  templateUrl: './student-monitoring.component.html',
  styleUrls: ['./student-monitoring.component.css']
})
export class StudentMonitoringComponent implements OnInit {
  instructorCourses: any[] = []; // Array to hold instructor's assigned courses
  selectedCourseId: string | null = null; // Selected course ID
  students: Student[] = []; // Array to hold students enrolled in the selected course
  loggedInUserId: string | null = null; // Logged-in instructor's user ID

  constructor(
    private courseService: CourseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLoggedInUser(); // Load the logged-in instructor's data on component initialization
  }

  async loadLoggedInUser(): Promise<void> {
    try {
      const userId = await this.auth.getLoggedInUserId(); // Get the logged-in user ID
      if (userId) {
        this.loggedInUserId = userId;
        this.loadInstructorCourses(userId); // Load courses assigned to the instructor
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
  getSelectedCourseName(): string | null {
    const selectedCourse = this.instructorCourses.find(course => course.id === this.selectedCourseId);
    return selectedCourse ? selectedCourse.name : null;
  }

  onCourseSelect(courseId: string): void {
    this.selectedCourseId = courseId; // Set the selected course ID
    this.loadStudentsForCourse(courseId); // Load students enrolled in the selected course
  }

  loadStudentsForCourse(courseId: string): void {
    this.courseService.getStudentsForCourse(courseId).subscribe({
      next: (students) => {
        this.students = students.map((student) => ({
          id: student.id, // Ensure this matches the backend field name
          email: student.email,
          grade: student.courseGrades?.[courseId] || 0, // Default grade to 0 if not set
        }));
      },
      error: (error) => console.error('Error loading students for course', error),
    });
  }

}
