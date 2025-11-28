
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../types';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <aside class="w-64 bg-[#0f172a] h-screen flex flex-col text-white transition-all duration-300 z-20 hidden lg:flex flex-shrink-0">
      <!-- Logo Area -->
      <div class="h-16 flex items-center justify-center border-b border-gray-700 bg-[#0f172a]">
        <div class="flex flex-col items-center">
            <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0f172a] font-bold text-xs border-2 border-blue-500">
                LOGO
            </div>
        </div>
      </div>

      <!-- Menu Items -->
      <nav class="flex-1 py-4">
        <ul>
          <li *ngFor="let item of items">
            <button
              (click)="onSelectMenu(item.id)"
              class="w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center gap-2"
              [ngClass]="{
                'bg-[#1e293b] border-l-4 border-blue-500 text-white': activeId === item.id,
                'text-gray-400 hover:bg-[#1e293b] hover:text-white': activeId !== item.id
              }"
            >
              <!-- Icon Logic: Assignment Icon if ID is 'phan-cong', else Book Icon -->
              <svg *ngIf="item.id === 'phan-cong'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <svg *ngIf="item.id !== 'phan-cong'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              
              {{ item.label }}
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  `
})
export class SidebarComponent {
  @Input() items: MenuItem[] = [];
  @Input() activeId: string = '';
  @Output() menuChange = new EventEmitter<string>();

  onSelectMenu(id: string) {
    this.menuChange.emit(id);
  }
}
