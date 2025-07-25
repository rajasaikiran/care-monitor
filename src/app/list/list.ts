import { Component, inject, OnInit } from '@angular/core';
import { ListStore } from '../domain-logic/list-store';
import { MatCardModule } from '@angular/material/card';
import { MatSpinner } from '@angular/material/progress-spinner';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [CommonModule, NgIf, NgFor,MatCardModule, MatSpinner],
  templateUrl: './list.html',
  styleUrl: './list.scss',
    providers: [ListStore],
})
export class List implements OnInit {
 protected store = inject(ListStore);

  ngOnInit(): void {
    this.store.loadItems();
  }
}
