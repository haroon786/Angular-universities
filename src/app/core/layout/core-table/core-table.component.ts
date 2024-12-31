import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {
  MatPaginatorModule,
  MatPaginator,
  PageEvent,
} from '@angular/material/paginator';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { UniversityListService } from '../../../shared/services/university-list.service';
import { HttpClient } from '@angular/common/http';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

@Component({
  selector: 'core-table',
  templateUrl: './core-table.component.html',
  styleUrl: './core-table.component.scss',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, LoaderComponent],
})
export class CoreTableComponent {
  displayedColumns = [
    'name',
    'country',
    'website',
    'state-province',
    'alpha_two_code',
  ];
  universityListService = inject(UniversityListService);
  data = signal<[]>([]);

  currentPage = signal(0);
  pageSize = signal(20);
  sortState = signal<Sort>({ active: '', direction: '' });

  displayedData = linkedSignal(() => this.cala());

  cala() {
    let data = [...this.data()];

    // Apply Sorting
    const sort = this.sortState();
    if (sort.active && sort.direction) {
      data.sort((a, b) => {
        const valueA = a[sort.active as keyof typeof a];
        const valueB = b[sort.active as keyof typeof b];
        const comparisonA = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        return sort.direction === 'asc' ? comparisonA : -comparisonA;
      });
    }

    const startIndex = this.currentPage() * this.pageSize();
    const endIndex = startIndex + this.pageSize();
    return data.slice(startIndex, endIndex);
  }
  effInstance = effect(() => {
    this.data.set(this.universityListService.universityData.value());
  });
  // Page Change Handler
  onPageChange(event: PageEvent) {
    this.pageSize.set(event.pageSize);
    this.currentPage.set(event.pageIndex);
  }

  // Sort Change Handler
  onSortChange(sort: Sort) {
    this.sortState.set(sort);
  }
}
