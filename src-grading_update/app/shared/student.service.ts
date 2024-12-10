import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { getFirestore, doc, getDoc } from "firebase/firestore";
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  async getStudentById(studentId: string): Promise<any> {
    const db = getFirestore();
    const studentRef = doc(db, "users", studentId);

    try {
      const snapshot = await getDoc(studentRef);
      if (snapshot.exists()) {
        return snapshot.data();
      } else {
        console.log("No student data found");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving student data:", error);
      throw error;
    }
  }
}

