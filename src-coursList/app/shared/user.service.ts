import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore, private auth:AuthService) { }
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
  deleteUser(userId: string): Promise<void> {
    return this.firestore.collection('users').doc(userId).delete();
  }
}
