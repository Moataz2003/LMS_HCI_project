import { CourseService } from '../../shared/course.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrl: './course-management.component.css'
})
export class CourseManagementComponent implements OnInit{
  // Navigate to the edit page with the selected course ID
  courses: any[] = [];
  isLoading = false;
  constructor(private router: Router,private courseService: CourseService) {}
  courses$!: Observable<any[]>;
  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }
  // Fetch all courses from Firebase

  navigateToAddCourse(): void {
    this.router.navigate(['/add-course']);
  }
  editCourse(course: { id: string }): void {
    this.router.navigate(['/edit-course', course.id]);
  }
  //archiving
  archiveCourse(course: { id: string; isArchived: boolean }): void {
    // Pass the course object to the service method
    this.courseService.archiveCourse(course).then(() => {
      alert(`Course ${course.isArchived ? 'unarchived' : 'archived'} successfully`);
      this.courses$ = this.courseService.getCourses(); // Refresh the courses list
    }).catch(error => {
      console.error('Error toggling course status:', error);
    });
  }
  deleteCourse(courseId: string): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(courseId).then(() => {
        alert('Course deleted successfully');
        // Reassign courses$ to refresh the course list
        this.courses$ = this.courseService.getCourses();
      }).catch((error) => {
        console.error('Error deleting course:', error);
        alert('Failed to delete the course.');
      });
    }
  }


}
export interface Course {
  id:string ;
  title: string;
  description: string;
  enrolledStudents?: string[];
  instructorId:string;
  materials?: string[];
}
