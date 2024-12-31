import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTableComponent } from "./core/layout/core-table/core-table.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, CoreTableComponent]
})
export class AppComponent {

  constructor() {

  }
}
