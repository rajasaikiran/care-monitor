// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems() {
    return this.http.get<{ id: number; name: string; description: string }[]>('/api/items').pipe(
      delay(1000)  
    );
  }
}
