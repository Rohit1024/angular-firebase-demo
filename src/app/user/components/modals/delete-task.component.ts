import { CrudService } from '@/app/services/crud.service';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  input,
} from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  standalone: true,
  selector: 'task-delete',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog #delete_modal class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Delete Task ?</h3>
        <div class="modal-action">
          <form method="dialog">
            <button
              class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <p>Are you sure you want to delete {{ data().title }} task ?</p>
        </div>
        <div class="flex gap-2 items-center justify-between mt-8">
          <button
            class="btn btn-primary flex-1"
            type="submit"
            (click)="deleteTask()"
          >
            Delete Task
          </button>
          <button class="btn flex-1" type="button" (click)="closeModal()">
            Close
          </button>
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
export class DeleteTaskComponent implements OnInit {
  data = input.required<{ id: string; title: string }>();

  @ViewChild('delete_modal', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  toast = inject(HotToastService);
  api = inject(CrudService);

  deleteTask() {
    this.api
      .removeTask(this.data().id)
      .subscribe(() => this.dialog.nativeElement.close());
  }

  ngOnInit(): void {
    this.dialog.nativeElement.showModal();
  }

  closeModal() {
    this.dialog.nativeElement.close();
  }
}
