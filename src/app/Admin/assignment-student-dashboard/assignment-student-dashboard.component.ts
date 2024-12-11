import { Component, OnInit } from '@angular/core';
import { AssignmentStudentsService } from '../../shared/assignment-students.service';
import { StudentService } from '../../shared/student.service';
import { User } from '../user-management/user-management.component';
import { Course } from '../course-management/course-management.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-assignment-student-dashboard',
  templateUrl: './assignment-student-dashboard.component.html',
  styleUrl: './assignment-student-dashboard.component.css'
})
export class AssignmentStudentDashboardComponent implements OnInit {
  students: User[] = [];
  courses: Course[] = [];
  selectedStudentId: string = '';
  selectedCourseId: string = '';

  constructor(
    private assignmentService: AssignmentStudentsService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadCourses();
  }

  //Load all students
  loadStudents(): void {
    this.firestore
      .collection<User>('users', (ref) => ref.where('role', '==', 'student'))
      .valueChanges({ idField: 'id' }) // Adds 'id' to each User object
      .subscribe((students) => {
        this.students = students;
      });
  }

  // Load all courses
  loadCourses(): void {
    this.firestore
      .collection<Course>('courses')
      .valueChanges({ idField: 'id' }) // Ensure Firestore IDs are included
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          // console.log('Courses loaded successfully:', courses); // Debug log
        },
        error: (err) => {
          console.error('Error loading courses:', err); // Log errors
          // alert('Failed to load courses. Please try again.');
        },
      });
  }


  // Assign a student to a course
  assignStudentToCourse(): void {
    if (!this.selectedStudentId || !this.selectedCourseId) {
      alert('Please select both a student and a course.');
      return;
    }

    this.assignmentService
      .assignStudentToCourse(this.selectedStudentId, this.selectedCourseId)
      .then(() => {
        alert('Student successfully assigned to course.');
      })
      .catch((error) => {
        console.error('Error assigning student to course:', error);
        alert('Failed to assign student to course.');
      });
  }
}
