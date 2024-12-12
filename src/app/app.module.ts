import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import {FormsModule}from '@angular/forms';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
 import { CourseManagementComponent } from './Admin/course-management/course-management.component';
 import { AddCourseComponent } from './Admin/add-course/add-course.component';
import { EditCourseComponent } from './Admin/edit-course/edit-course.component';
import { UserManagementComponent } from './Admin/user-management/user-management.component';
import { AssignmentStudentsComponent } from './Admin/assignment-students/assignment-students.component';
import { AssignmentStudentDashboardComponent } from './Admin/assignment-student-dashboard/assignment-student-dashboard.component';
import { CourseCreationComponent } from './instructor/course-creation/course-creation.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { GradingComponent } from './instructor/grading/grading.component';
import { StudentMonitoringComponent } from './instructor/student-monitoring/student-monitoring.component';
import { AssignmentSubmissionComponent } from './student/assignment-submission/assignment-submission.component';
import { CourseListComponent } from './student/course-list/course-list.component';
import { CourseDetailsComponent } from './student/course-details/course-details.component';
import { ProgressTrackerComponent } from './student/progress-tracker/progress-tracker.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AdminDashboardComponent,
    CourseManagementComponent,
     AddCourseComponent,
     EditCourseComponent,
     UserManagementComponent,
     AssignmentStudentsComponent,
     AssignmentStudentDashboardComponent,
     CourseCreationComponent,
     InstructorDashboardComponent,
     GradingComponent,
     StudentMonitoringComponent,
     AssignmentSubmissionComponent,
     CourseListComponent,
     CourseDetailsComponent,
     ProgressTrackerComponent,
     StudentDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
