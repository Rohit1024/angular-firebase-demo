import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'theme-preview-chip',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      attr.data-theme="{{ theme() }}"
      attr.data-set-theme="{{ theme() }}"
      class="btn btn-sm btn-block bg-base-100 flex justify-between"
    >
      <span>{{ theme() | titlecase }}</span>
      <div class="flex items-center gap-2 float-right">
        <span class="bg-primary h-4 w-2 rounded-box"></span>
        <span class="bg-secondary h-4 w-2 rounded-box"></span>
        <span class="bg-accent h-4 w-2 rounded-box"></span>
        <span class="bg-neutral h-4 w-2 rounded-box"></span>
      </div>
    </button>
  `,
})
export class ThemeChipComponent {
  theme = input.required<string>();
  utilityClasses = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-neutral'];
}
