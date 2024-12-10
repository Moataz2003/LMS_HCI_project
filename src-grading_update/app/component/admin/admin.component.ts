import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit  {
  users: any[] = []; // Holds the list of users
  loading: boolean = true; // Show a loader while fetching data
  constructor(private admSrv:UserService) { }
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

  onDeactivateUser(userId: string): void {
    this.admSrv.deactivateUser(userId)
      .then(() => {
        alert('User deactivated successfully!');
        this.fetchUsers(); // Refresh the user list
      })
      .catch(err => console.error('Error deactivating user:', err));
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
}


