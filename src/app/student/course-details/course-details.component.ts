import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css'],
})
export class CourseDetailsComponent implements OnInit {
  courseId: string | null = null;
  courseDetails: any;
  assessments: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.courseId = params.get('id');
      if (this.courseId) {
        this.fetchCourseDetails(this.courseId); // Fetch course details
        this.fetchCourseAssessments();         // Fetch assessments
      }
    });
  }

  fetchCourseDetails(courseId: string): void {
    this.firestore
      .collection('courses')
      .doc(courseId)
      .valueChanges()
      .subscribe({
        next: (course: any) => {
          if (course) {
            this.courseDetails = course;
          } else {
            console.error('Course not found!');
          }
        },
        error: (error) => {
          console.error('Error fetching course details:', error);
        },
      });
  }

  fetchCourseAssessments(): void {
    this.firestore
      .collection('assessments', (ref) =>
        ref.where('courseId', '==', this.courseId)
      ) // Filter assessments by courseId
      .valueChanges()
      .subscribe({
        next: (assessments: any[]) => {
          this.assessments = assessments;
        },
        error: (error) => {
          console.error('Error fetching course assessments:', error);
        },
      });
  }
}
