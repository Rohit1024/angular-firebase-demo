import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Task } from '@/app/services/crud.service';
import { CommonModule } from '@angular/common';
import { EditTaskComponent } from '@/app/features/tasks/components/modals/edit-task.component';
import { DeleteTaskComponent } from '@/app/features/tasks/components/modals/delete-task.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faEye,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'user-task',
  standalone: true,
  imports: [
    CommonModule,
    EditTaskComponent,
    DeleteTaskComponent,
    FontAwesomeModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if(userTasks()) {
    <table class="table w-full rounded-xl">
      <thead class="bg-primary text-black">
        <tr>
          @for(column of columns; track column) {
          <th [ngClass]="{ 'text-center': column === 'Actions' }">
            {{ column }}
          </th>
          }
        </tr>
      </thead>
      <tbody>
        @for (task of userTasks(); track task.id) {
        <tr>
          <td>{{ task.id }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.label }}</td>
          <td>{{ task.priority }}</td>
          <td>{{ task.due_date.toDate() | date }}</td>
          <td class="flex gap-2 justify-center">
            <button class="btn btn-square btn-success btn-sm">
              <fa-icon [icon]="faView" />
            </button>
            <button
              class="btn btn-square btn-accent btn-sm"
              (click)="toggleEditModal(task)"
            >
              <fa-icon [icon]="faEdit" />
            </button>
            <button
              class="btn btn-square btn-error btn-sm"
              (click)="toggleDeleteModal(task)"
            >
              <fa-icon [icon]="faDelete" />
            </button>
          </td>
        </tr>
        }
      </tbody>
    </table>
    } @else {
    <div class="card w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">No Tasks Yet</h2>
        <p>Create a Task to Enjoy the Demo</p>
      </div>
    </div>
    }
    <task-edit *ngIf="editModal" [task]="editmodalPaylaod" />
    <task-delete *ngIf="deleteModal" [data]="deleteModalPayload" />
  `,
})
export class TaskComponent {
  userTasks = input.required<Task[]>();

  //Icons
  faView = faEye;
  faEdit = faPenToSquare;
  faDelete = faTrash;

  columns = [
    'Id',
    'Title',
    'Status',
    'Label',
    'Priority',
    'Due Date',
    'Actions',
  ] as const;
  editmodalPaylaod!: Task;
  deleteModalPayload!: {
    id: string;
    title: string;
  };
  addModal = false;
  editModal = false;
  deleteModal = false;

  toggleAddModal() {
    this.addModal = !this.addModal;
  }

  toggleEditModal(task: Task) {
    this.editmodalPaylaod = { ...task };
    this.editModal = !this.editModal;
  }

  toggleDeleteModal(task: Task) {
    this.deleteModalPayload = { ...task };
    this.deleteModal = !this.deleteModal;
  }
}
