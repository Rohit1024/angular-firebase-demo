import { CrudService, Task } from '@/app/services/crud.service';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  standalone: true,
  selector: 'task-edit',
  imports: [ReactiveFormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #edit_modal class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Edit Task</h3>
        <div class="modal-action">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <form
            [formGroup]="editTasksForm"
            class="w-full p-2"
            (ngSubmit)="editTask()"
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
              @if(editTasksForm.get('title')?.hasError){
              <div class="label">
                @if(handleError('title', 'required')){
                <span class="label-text-alt text-error">Title is Required</span>
                }
              </div>
              }
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
              @if(editTasksForm.get('status')?.hasError){
              <div class="label">
                @if(handleError('status', 'required')){
                <span class="label-text-alt text-error"
                  >Status is Required</span
                >
                }
              </div>
              }
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
              @if(editTasksForm.get('label')?.hasError){
              <div class="label">
                @if(handleError('label', 'required')){
                <span class="label-text-alt text-error">Label is Required</span>
                }
              </div>
              }
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
              @if(editTasksForm.get('priority')?.hasError){
              <div class="label">
                @if(handleError('priority', 'required')){
                <span class="label-text-alt text-error"
                  >Priority is Required</span
                >
                }
              </div>
              }
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
              @if(editTasksForm.get('due_date')?.hasError){
              <div class="label">
                @if(handleError('due_date', 'required')){
                <span class="label-text-alt text-error"
                  >Due Date is Required</span
                >
                }
              </div>
              }
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
export class EditTaskComponent implements OnInit {
  task = input.required<Task>();

  @ViewChild('edit_modal', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);

  fb = inject(NonNullableFormBuilder);
  api = inject(CrudService);
  toast = inject(HotToastService);

  close_message = 'Dialog Closed';
  statuses = ['canceled', 'done', 'in-progress', 'todo', 'backlog'];
  labels = ['bug', 'feature', 'documentation'];
  priorities = ['low', 'medium', 'high'];

  editTasksForm = this.fb.group({
    id: [this.task().id],
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

  ngOnInit() {
    this.editTasksForm.patchValue({ ...this.task() });
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }

  public handleError = (controlName: string, errorName: string) => {
    return (
      this.editTasksForm.get(controlName)?.touched &&
      this.editTasksForm.get(controlName)?.errors &&
      this.editTasksForm.get(controlName)?.hasError(errorName)
    );
  };

  editTask() {
    const { id, title, status, label, priority, due_date } = this.editTasksForm
      .value as Partial<Task>;
    if (
      !this.editTasksForm.valid ||
      !id ||
      !title ||
      !status ||
      !label ||
      !priority ||
      !due_date
    )
      return;

    this.api
      .editTask({ id, title, status, label, priority, due_date } as Task)
      .subscribe(() => this.dialog.nativeElement.close());
  }

  formateDate(event: any) {
    const selectedDate = new Date(event.target?.value);
    this.editTasksForm.patchValue({
      due_date: Timestamp.fromDate(selectedDate),
    });
  }

  closeModal() {
    this.dialog.nativeElement.close();
  }
}
