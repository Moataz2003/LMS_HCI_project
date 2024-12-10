import { Assessment, Student } from './../instructor/course-creation/course-creation.component';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from '../Admin/course-management/course-management.component';

@Injectable({
  providedIn: 'root',
})
export class GradingService {
  private usersCollection = 'users';
  private assessmentsCollection = 'assessments';
  private collectionName = 'courses';
  constructor(private firestore: AngularFirestore) {}

  /**
   * Updates the grade for a student in a specific course and assessment.
   *
   * @param courseId The ID of the course.
   * @param assessmentId The ID of the assessment.
   * @param studentId The ID of the student.
   * @param grade The grade to add/update for the student.
   * @returns A promise that resolves when the operation is complete.
   */
  updateStudentGrade(
    courseId: string,
    assessmentId: string,
    studentId: string,
    grade: number
  ): Promise<void> {
    const studentRef = this.firestore.collection(this.usersCollection).doc(studentId);
    const assessmentRef = this.firestore.collection(this.assessmentsCollection).doc(assessmentId);

    return this.firestore.firestore.runTransaction(async (transaction) => {
      // Fetch the assessment document
      const assessmentDoc = await transaction.get(assessmentRef.ref);
      if (!assessmentDoc.exists) {
        throw new Error('Assessment not found');
      }

      // Fetch the student's document
      const studentDoc = await transaction.get(studentRef.ref);
      if (!studentDoc.exists) {
        throw new Error('Student not found');
      }

      // Update the `studentSubmissions` field in the assessment document
      const assessmentData = assessmentDoc.data() as Assessment;
      const studentSubmissions = assessmentData?.studentSubmissions || {};

      studentSubmissions[studentId] = {
        submittedAt: new Date().toISOString(),
        // grade,
      };

      transaction.update(assessmentRef.ref, { studentSubmissions });

      // Update the `courseGrades` in the student's document
      const studentData = studentDoc.data() as Student;
      const courseGrades = studentData?.courseGrades || {};
      courseGrades[courseId] = (courseGrades[courseId] || 0) + grade; // Update grade logic

      transaction.update(studentRef.ref, { courseGrades });
    });
  }

  /**
   * Fetches the assessments for a given course.
   *
   * @param courseId The ID of the course.
   * @returns An observable of the assessments.
   */
  getAssessmentsForCourse(courseId: string) {
    return this.firestore
      .collection(this.assessmentsCollection, (ref) =>
        ref.where('courseId', '==', courseId)
      )
      .valueChanges({ idField: 'id' });
  }

  /**
   * Fetches the students who submitted an assessment.
   *
   * @param assessmentId The ID of the assessment.
   * @returns An observable of the students who submitted the assessment.
   */
  getSubmittedStudents(assessmentId: string) {
    return this.firestore
      .collection(this.assessmentsCollection)
      .doc(assessmentId)
      .valueChanges()
      .pipe(
        map((assessment: any) => {
          const studentSubmissions = assessment?.studentSubmissions || {}; // Expecting studentSubmissions to be an object
          return Object.keys(studentSubmissions).map((studentId) => ({
            studentId: studentId, // studentId from the keys of studentSubmissions
            ...studentSubmissions[studentId], // Spread submission details for each student
          }));
        })
      );
  }

  async submitAssessment(
    courseId: string,
    assessmentId: string,
    studentId: string
  ): Promise<void> {
    const studentRef = this.firestore.collection(this.usersCollection).doc(studentId);
    const assessmentRef = this.firestore.collection(this.assessmentsCollection).doc(assessmentId);

    return this.firestore.firestore.runTransaction(async (transaction) => {
      const studentDoc = await transaction.get(studentRef.ref);
      if (!studentDoc.exists) {
        throw new Error('Student document not found');
      }

      const assessmentDoc = await transaction.get(assessmentRef.ref);
      if (!assessmentDoc.exists) {
        throw new Error('Assessment document not found');
      }

      const assessmentData = assessmentDoc.data() as any;
      const studentSubmissions = assessmentData?.studentSubmissions || {};

      // Log the submission with the current timestamp
      studentSubmissions[studentId] = {
        submittedAt: new Date().toISOString(),
        // grade: 0 // Set grade to 0 by default for submission
      };

      transaction.update(assessmentRef.ref, { studentSubmissions });
    });
  }


  getAssessmentsForStudent(studentId: string) {
    return this.firestore
      .collection(this.assessmentsCollection, (ref) =>
        ref.where(`studentSubmissions.${studentId}`, '!=', null) // Filters assessments with submissions from this student
      )
      .valueChanges({ idField: 'id' });
  }
  // getCoursesForStudent(studentId: string) {
  //   return this.firestore
  //     .collection('courses', (ref) => ref.where('studentIds', 'array-contains', studentId))
  //     .valueChanges({ idField: 'id' }) // Include the document ID
  //     .pipe(
  //       map((courses: any[]) =>
  //         courses.map((course) => ({
  //           id: course.id,
  //           title: course.title,
  //           description: course.description,
  //           instructorId: course.instructorId,
  //         }))
  //       )
  //     );
  // }

}
