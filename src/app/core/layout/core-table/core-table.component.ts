import {
  AfterViewInit,
  Component,
  inject,
  input,
  ViewChild,
} from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { UniversityListService } from '../../../shared/services/university-list.service';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'core-table',
  templateUrl: './core-table.component.html',
  styleUrl: './core-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
export class CoreTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<any>;
  universityListService = inject(UniversityListService);
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  http = inject(HttpClient);
  displayedColumns = [
    'name',
    'country',
    'website',
    'state-province',
    'alpha_two_code',
  ];
  data = toSignal(
    this.http.get(
      'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json'
    )
  );
  //data: any;
  myInput = input<any>();
  constructor() {
    // console.log(this.universityListService.getUniversityData());
  }

  ngOnInit() {
    console.log(this.data());
    if (this.universityListService.universityData()) {
      this.data = this.myInput();
      // this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
}
