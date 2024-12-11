import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { User } from '../Admin/user-management/user-management.component';
import { Course } from '../Admin/course-management/course-management.component';
@Injectable({
  providedIn: 'root',
})
export class AssignmentStudentsService {
  constructor(private firestore: AngularFirestore) {}

  assignStudentToCourse(studentId: string, courseId: string): Promise<void> {
    const userRef = this.firestore.doc<User>(`users/${studentId}`);
    const courseRef = this.firestore.doc<Course>(`courses/${courseId}`);

    return this.firestore.firestore.runTransaction(async (transaction) => {
      const userDoc = await transaction.get(userRef.ref);
      const courseDoc = await transaction.get(courseRef.ref);

      const userData = userDoc.data() as User | undefined;
      const courseData = courseDoc.data() as Course | undefined;

      if (!userData || !courseData) {
        throw new Error('User or Course not found.');
      }

      const enrolledCourses = userData.enrolledCourses || [];
      const enrolledStudents = courseData.enrolledStudents || [];

      transaction.update(userRef.ref, {
        enrolledCourses: Array.from(new Set([...enrolledCourses, courseId])),
      });

      transaction.update(courseRef.ref, {
        enrolledStudents: Array.from(new Set([...enrolledStudents, studentId])),
      });
    });
  }
}
