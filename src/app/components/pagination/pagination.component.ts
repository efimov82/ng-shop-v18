import { DecimalPipe } from '@angular/common';
import {
  Component,
  computed,
  input,
  Signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  page = input<number>(1);
  countPages = input.required<number>();
  pagesArr: Signal<string[]> = computed(() => {
    const res: string[] = [];
    for (let i = 1; i <= this.countPages(); i++) {
      res.push(i.toString());
    }

    return res;
  });
}
