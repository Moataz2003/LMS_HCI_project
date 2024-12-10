import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../shared/course.service';
import { AuthService } from '../../shared/auth.service';
import { Course } from '../../Admin/course-management/course-management.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-instructor-dashboard',
  templateUrl: './instructor-dashboard.component.html',
  styleUrls: ['./instructor-dashboard.component.css']
})
export class InstructorDashboardComponent  {
//   selectedCourseId: string | null = null;
//   material: string = '';
//   assessmentTitle: string = '';
//   instructorCourses$!: Observable<any[]>;
//   loggedInUserId: string | null = null;

//   constructor(private courseService: CourseService, private auth: AuthService) {}

//   ngOnInit(): void {
//     this.auth.getLoggedInUserId()
//       .then((userId) => {
//         console.log('Logged-in user ID:', userId);

//         if (userId) {
//           this.loggedInUserId = userId;
//           this.loadInstructorCourses(userId);
//         } else {
//           console.error('User is not logged in.');
//         }
//       })
//       .catch((error) => {
//         console.error('Error during authentication check:', error);
//       });
//   }

//   loadInstructorCourses(instructorId: string): void {
//     if (!instructorId) {
//       console.error('Invalid instructorId passed to loadInstructorCourses');
//       return;
//     }

//     this.instructorCourses$ = this.courseService.getCoursesForInstructor(instructorId);
//   }

//   // Handles the dropdown selection change
//   onCourseSelect(event: any): void {
//     this.selectedCourseId = event.target.value; // Update the selected course ID
//     console.log('Selected Course ID:', this.selectedCourseId);
//   }

//   addMaterial(): void {
//     if (!this.selectedCourseId || !this.material) {
//       alert('Please select a course and enter material.');
//       return;
//     }

//     this.courseService
//       .addMaterial(this.selectedCourseId, this.material)
//       .then(() => {
//         alert('Material added successfully!');
//         this.material = '';
//       })
//       .catch((error) => {
//         console.error('Failed to add material:', error);
//         alert('Error adding material.');
//       });
//   }

//   createAssessment(): void {
//     if (!this.selectedCourseId || !this.assessmentTitle) {
//       alert('Please select a course and enter an assessment title.');
//       return;
//     }

//     const assessment = {
//       courseId: this.selectedCourseId,
//       title: this.assessmentTitle,
//       createdAt: new Date().toISOString(),
//       studentSubmissions: {}, // Initialize as an empty object
//     };

//     this.courseService
//       .createAssessment(assessment)
//       .then(() => {
//         alert('Assessment created successfully!');
//         this.assessmentTitle = '';
//       })
//       .catch((error) => {
//         console.error('Failed to create assessment:', error);
//         alert('Error creating assessment.');
//       });
//   }

// }
}
