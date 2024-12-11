import { CourseService } from './../../shared/course.service';
import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user-management/user-management.component';
import { Course } from '../course-management/course-management.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent implements OnInit{
constructor(private router:Router,private courseService:CourseService,private firestore: AngularFirestore){}

ngOnInit(): void {
  this.loadInstructors();
}
course = { title: '', description: '', instructorId: '' ,id:'',isArchived:false};
instructors: User[] = [];
onSubmit(): void {
  if (!this.course.title || !this.course.description || !this.course.instructorId) {
    alert('Please fill in all fields, including instructor selection.');
    return;
  }

  this.courseService
      .addCourseWithInstructor(this.course)
      .then(() => {
        alert('Course added successfully!');
        this.router.navigate(['/coursemanagement']); // Redirect to course management
      })
      .catch((error) => {
        console.error('Error adding course:', error);
        alert('Failed to add course.');
      });
  }
loadInstructors(): void {
  this.firestore
    .collection<User>('users', (ref) => ref.where('role', '==', 'instructor'))
    .valueChanges({ idField: 'id' })
    .subscribe((instructors) => {
      this.instructors = instructors;
    });
}


}
