import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { AuthService } from '../../shared/auth.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: any[] = []; // Holds the list of users
  loading: boolean = true; // Show a loader while fetching data
  constructor(private admSrv:UserService,private auth:AuthService) { }
  ngOnInit(): void {
    this.fetchUsers();
  }
  fetchUsers(): void {
    this.admSrv.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
      },
    });
  }

  onApproveUser(userId: string): void {
    this.admSrv.approveUser(userId)
      .then(() => {
        alert('User approved successfully!');
        this.fetchUsers(); // Refresh the user list
      })
      .catch(err => console.error('Error approving user:', err));
  }

  toggleUserStatus(userId: string, currentStatus: 'activated' | 'deactivated'): void {
    const newStatus = currentStatus === 'activated' ? 'deactivated' : 'activated';
    this.admSrv.updateUserStatus(userId, newStatus)
      .then(() => console.log(`User ${newStatus} successfully`))
      .catch(err => console.error(`Error updating user status to ${newStatus}:`, err));
  } 

  onDeleteUser(userId: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.admSrv.deleteUser(userId)
        .then(() => {
          alert('User deleted successfully!');
          this.fetchUsers(); // Refresh the user list
        })
        .catch(err => console.error('Error deleting user:', err));
    }
  }
  logOut(){
    this.auth.logout();
  }

}
export interface User {
  id: string;
  email: string;
  enrolledCourses?: string[]; // Optional, as it may not exist initially
  assignedCourses?: string[];//for instructor
}


