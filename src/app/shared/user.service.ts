import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CourseService } from './course.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { firstValueFrom } from 'rxjs';
import { Course } from '../Admin/course-management/course-management.component';
import { Student } from '../instructor/course-creation/course-creation.component';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private auth:AuthService,    private courseService: CourseService // Inject CourseService to handle course-related operations
  ) { }
   // Fetch all users
  getAllUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges({ idField: 'id' });
  }
  // Approve a user
  approveUser(userId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({ approved: true ,status:'approved' });
  }
    // Deactivate a user
    deactivateUser(userId: string): Promise<void> {
      return this.firestore.collection('users').doc(userId).update({ status: 'deactivated' });
    }
  // Delete a user
  async deleteUser(userId: string): Promise<void> {
    const userRef = this.firestore.collection('users').doc(userId);

    try {
      // Retrieve all courses the user is enrolled in using `firstValueFrom`
      const courses = await firstValueFrom(this.courseService.getCoursesForStudent(userId));

      // Run a transaction to remove the user from enrolled courses and delete the user
      await this.firestore.firestore.runTransaction(async (transaction) => {
        // Remove the user from the enrolledStudents list in each course
        for (const course of courses || []) {
          const courseRef = this.firestore.collection('courses').doc(course.id).ref;
          const courseDoc = await transaction.get(courseRef);

          if (courseDoc.exists) {
            const courseData = courseDoc.data()as Course;
            const enrolledStudents = courseData?.enrolledStudents || [];

            transaction.update(courseRef, {
              enrolledStudents: enrolledStudents.filter((id: string) => id !== userId),
            });
          }
        }

        // Delete the user document
        transaction.delete(userRef.ref);
      });

      console.log(`User ${userId} and their enrollments have been removed.`);
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
  updateUserStatus(userId: string, status: 'activated' | 'deactivated'): Promise<void> {
    return this.firestore.collection('users').doc(userId).update({ status });
  }

  getStudentData(studentId: string): Observable<Student> {
    return this.firestore.collection('users').doc<Student>(studentId).valueChanges() as Observable<Student>;
  }

}
