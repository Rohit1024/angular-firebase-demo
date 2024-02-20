import { InputErrorsComponent } from '@/app/components/input-errors.component';
import { CrudService, Task } from '@/app/services/crud.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'task-add',
  imports: [ReactiveFormsModule, InputErrorsComponent, TitleCasePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #add_modal class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Create Task</h3>
        <div class="modal-action">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
        </div>
        <form
          [formGroup]="addTasksForm"
          class="w-full p-2"
          (ngSubmit)="addTask()"
        >
          <label class="form-control">
            <div class="label">
              <span class="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Ring a bell"
              class="input input-bordered"
              formControlName="title"
            />
            <input-error-messages
              [control]="addTasksForm.get('title')!"
              errorMessageKeyName="text"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Status</span>
            </div>
            <select class="select select-bordered" formControlName="status">
              <option>Select a Status</option>
              @for (state of statuses; track $index) {
              <option [value]="state">{{ state | titlecase }}</option>
              }
            </select>
            <input-error-messages
              [control]="addTasksForm.get('status')!"
              errorMessageKeyName="select"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Label</span>
            </div>
            <select class="select select-bordered" formControlName="label">
              <option>Select a Label</option>
              @for (lab of labels; track $index) {
              <option [value]="lab">{{ lab | titlecase }}</option>
              }
            </select>
            <input-error-messages
              [control]="addTasksForm.get('label')!"
              errorMessageKeyName="select"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Priority</span>
            </div>
            <select class="select select-bordered" formControlName="priority">
              <option>Select a Priority</option>
              @for (prior of priorities; track $index) {
              <option [value]="prior">{{ prior | titlecase }}</option>
              }
            </select>
            <input-error-messages
              [control]="addTasksForm.get('priority')!"
              errorMessageKeyName="select"
            />
          </label>
          <label class="form-control">
            <div class="label">
              <span class="label-text">Due Date</span>
            </div>
            <input
              type="date"
              class="input input-bordered"
              formControlName="due_date"
              (change)="formateDate($event)"
            />
            <input-error-messages
              [control]="addTasksForm.get('due_date')!"
              errorMessageKeyName="date"
            />
          </label>
          <div class="flex gap-2 items-center justify-between mt-4">
            <button class="btn btn-primary flex-1" type="submit">
              Create Task
            </button>
            <button class="btn flex-1" type="button" (click)="closeModal()">
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  `,
  styles: [
    `
      :host {
        dialog::backdrop {
          @apply bg-neutral-900/80 backdrop-blur-sm;
        }
      }
    `,
  ],
})
export class AddTaskComponent implements OnInit {
  @ViewChild('add_modal', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  fb = inject(NonNullableFormBuilder);
  api = inject(CrudService);

  statuses = ['canceled', 'done', 'in-progress', 'todo', 'backlog'];
  labels = ['bug', 'feature', 'documentation'];
  priorities = ['low', 'medium', 'high'];

  addTasksForm = this.fb.group({
    title: ['', Validators.required],
    status: [
      '',
      [
        Validators.required,
        Validators.pattern('^(canceled|done|in-progress|todo|backlog)$'),
      ],
    ],
    label: [
      '',
      [
        Validators.required,
        Validators.pattern('^(bug|feature|documentation)$'),
      ],
    ],
    priority: [
      '',
      [Validators.required, Validators.pattern('^(low|medium|high)$')],
    ],
    due_date: [Timestamp.now(), [Validators.required]],
  });

  public handleError = (controlName: string, errorName: string) => {
    return (
      this.addTasksForm.get(controlName)?.touched &&
      this.addTasksForm.get(controlName)?.errors &&
      this.addTasksForm.get(controlName)?.hasError(errorName)
    );
  };

  formateDate(event: any) {
    const selectedDate = new Date(event.target?.value);
    this.addTasksForm.patchValue({
      due_date: Timestamp.fromDate(selectedDate),
    });
  }

  addTask() {
    const { title, status, label, priority, due_date } = this.addTasksForm
      .value as Partial<Task>;
    if (
      !this.addTasksForm.valid ||
      !title ||
      !status ||
      !label ||
      !priority ||
      !due_date
    )
      return;

    this.api
      .addtask({ title, status, label, priority, due_date } as Task)
      .subscribe((f) => {
        this.dialog.nativeElement.close();
      });
  }

  ngOnInit(): void {
    this.dialog.nativeElement.showModal();
  }

  closeModal() {
    this.dialog.nativeElement.close();
  }
}
