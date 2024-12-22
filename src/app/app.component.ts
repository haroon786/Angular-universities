import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UniversityListService } from './shared/services/university-list.service';
import { MenuSideComponent } from './core/layout/menu-side/menu-side.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterOutlet, MenuSideComponent],
})
export class AppComponent {
  inject = inject(UniversityListService);
  universityData = signal([]);
  constructor() {
    this.inject.getUniversityData();
    // this.inject.getU().subscribe((universityDataResponse: any) => {
    //   if (universityDataResponse) {
    //     this.universityData.set(universityDataResponse);
    //     console.log(this.universityData());
    //   }
    // });
  }
}
