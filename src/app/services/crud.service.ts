import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  Timestamp,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from } from 'rxjs';

export interface Task {
  id: string;
  title: string;
  status: 'canceled' | 'done' | 'in-progress' | 'todo' | 'backlog';
  label: 'bug' | 'feature' | 'documentation';
  priority: 'low' | 'medium' | 'high';
  due_date: Timestamp;
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  firestore = inject(Firestore);
  authService = inject(AuthService);
  taskColletionRef = collection(
    this.firestore,
    'users',
    `${this.authService.getCurrentUserUid()}`,
    'tasks'
  );

  getAllTasks() {
    return collectionData(this.taskColletionRef, {
      idField: 'id',
    }) as Observable<Task[]>;
  }

  getTask(id: string) {
    return docData(
      doc(
        this.firestore,
        'users',
        `${this.authService.getCurrentUserUid()}`,
        'tasks',
        id
      ),
      {
        idField: 'id',
      }
    ) as Observable<Task>;
  }

  addtask(task: Task) {
    return from(addDoc(this.taskColletionRef, task));
  }

  editTask(task: Task) {
    return from(
      updateDoc(
        doc(
          this.firestore,
          'users',
          `${this.authService.getCurrentUserUid()}`,
          'tasks',
          task.id
        ),
        {
          ...task,
        }
      )
    );
  }

  removeTask(id: string) {
    return from(
      deleteDoc(
        doc(
          this.firestore,
          'users',
          `${this.authService.getCurrentUserUid()}`,
          'tasks',
          id
        )
      )
    );
  }
}
