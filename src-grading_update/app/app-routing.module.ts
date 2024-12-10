import { AssignmentStudentsComponent } from './Admin/assignment-students/assignment-students.component';
import { CourseManagementComponent } from './Admin/course-management/course-management.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NgIf } from '@angular/common';
import { AddCourseComponent } from './Admin/add-course/add-course.component';
import { EditCourseComponent } from './Admin/edit-course/edit-course.component';
import { UserManagementComponent } from './Admin/user-management/user-management.component';
import { AssignmentStudentDashboardComponent } from './Admin/assignment-student-dashboard/assignment-student-dashboard.component';
import { InstructorDashboardComponent } from './instructor/instructor-dashboard/instructor-dashboard.component';
import { GradingComponent } from './instructor/grading/grading.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { AssignmentSubmissionComponent } from './student/assignment-submission/assignment-submission.component';
import { CourseListComponent } from './student/course-list/course-list.component';
import { ProgressTrackerComponent } from './student/progress-tracker/progress-tracker.component';
import { CourseCreationComponent } from './instructor/course-creation/course-creation.component';
import { StudentMonitoringComponent } from './instructor/student-monitoring/student-monitoring.component';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'admin-dashboard',component:AdminDashboardComponent},
  {path:'coursemanagement',component:CourseManagementComponent},
  {path:'add-course',component:AddCourseComponent},
  {path:'edit-course/:id',component:EditCourseComponent},
  {path:'user-management',component:UserManagementComponent},
  {path:'assigning-students',component:AssignmentStudentDashboardComponent},
  {path:'instructor-dashboard',component:InstructorDashboardComponent},
  {path:'inst-grading',component:GradingComponent},
  {path:'student-dashboard',component:StudentDashboardComponent},
  {path:'sumbit-assignment',component:AssignmentSubmissionComponent},
  {path:'course-list',component:CourseListComponent},
  {path:'student-progress',component:ProgressTrackerComponent},
  {path:'course-management',component:CourseCreationComponent},
  {path:'grading',component:GradingComponent},
  {path:'student-monitoring',component:StudentMonitoringComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgIf],
  exports: [RouterModule]
})
export class AppRoutingModule { }
