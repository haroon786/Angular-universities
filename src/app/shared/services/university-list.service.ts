import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class UniversityListService {
  http = inject(HttpClient);
  universityData:any = rxResource({
    loader: ()=>this.http.get(
      'https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json'
    ),
  })
}

// http://universities.hipolabs.com

// http://universities.hipolabs.com/search?name=middle

// http://universities.hipolabs.com/search?name=middle&country=turkey

//https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json
