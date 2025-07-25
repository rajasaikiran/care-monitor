// src/app/list/list.store.ts
import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { HttpClient } from '@angular/common/http';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export interface Item {
  id: number;
  name: string;
  description: string;
}

interface ListState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

@Injectable()
export class ListStore extends ComponentStore<ListState> {
  constructor(private http: HttpClient) {
    super({ items: [], loading: false, error: null });
  }

  readonly items$ = this.select((state) => state.items);
  readonly loading$ = this.select((state) => state.loading);
  readonly error$ = this.select((state) => state.error);

  readonly setLoading = this.updater((state, loading: boolean) => ({
    ...state,
    loading,
  }));

  readonly setItems = this.updater((state, items: Item[]) => ({
    ...state,
    items,
    loading: false,
    error: null,
  }));

  readonly setError = this.updater((state, error: string) => ({
    ...state,
    error,
    loading: false,
  }));

  readonly loadItems = this.effect((trigger$) =>
    trigger$.pipe(
      tap(() => this.setLoading(true)),
      switchMap(() =>
        this.http.get<Item[]>('/api/items').pipe(
          tap((items) => this.setItems(items)),
          catchError((err) => {
            this.setError('Failed to load items');
            return of();
          })
        )
      )
    )
  );
}
