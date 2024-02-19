import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { CrudService, Task } from '@/app/services/crud.service';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './components/modals/add-tasks.component';
import { TaskComponent } from '@/app/user/components/task.component';

@Component({
  selector: 'dash-tasks',
  standalone: true,
  imports: [CommonModule, AddTaskComponent, TaskComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card bg-base-200 shadow-xl w-full m-10">
      <div class="card-body">
        <div class="inline-block">
          <div class="flex gap-2 float-right">
            <input
              type="text"
              placeholder="Filter"
              class="input input-bordered w-full max-w-xs"
            />
            <button class="btn btn-primary" (click)="toggleAddModal()">
              Create Task
            </button>
          </div>
          <h2 class="card-title mt-3">Tasks Managemnet</h2>
        </div>
        <div class="divider"></div>
        <div class="overflow-x-auto w-full">
          @if (tasks(); as userTasks) {
          <user-task [userTasks]="userTasks" />
          }
        </div>
      </div>
    </div>
    <task-add *ngIf="addModal" dialogTitle="Add Task" />
  `,
})
export class UserTasksComponent implements OnInit {
  crudService = inject(CrudService);
  tasks = signal<Task[] | null>(null);

  ngOnInit(): void {
    this.getUserTasks();
  }

  getUserTasks() {
    this.crudService.getAllTasks().subscribe((data) => this.tasks.set(data));
  }

  addModal = false;

  toggleAddModal() {
    this.addModal = !this.addModal;
  }
}
