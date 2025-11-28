
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
      <div class="flex items-center gap-4">
        <button (click)="onToggleSidebar()" class="p-2 hover:bg-gray-100 rounded text-gray-600">
          <!-- Menu Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <h1 class="text-lg font-semibold text-gray-800">{{ title }}</h1>
          
          <!-- Badge Năm học -->
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
             <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
             Năm học: 2025 - 2026
          </span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button class="p-2 text-gray-500 hover:text-blue-600">
          <!-- Search Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </button>
        <button class="p-2 text-gray-500 hover:text-blue-600">
          <!-- Maximize Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M21 8V5a2 2 0 0 0-2-2h-3"/><path d="M3 16v3a2 2 0 0 0 2 2h3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/></svg>
        </button>
        <button class="p-2 text-gray-500 hover:text-blue-600 relative">
          <!-- Bell Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          <span class="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <button (click)="goBack()" class="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors ml-2">
          <!-- ArrowLeft Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Quay lại trang chủ
        </button>

        <div class="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5 ml-2 cursor-pointer hover:bg-gray-50">
          <div class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-600">
             <!-- User Icon -->
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
          <span class="text-xs font-medium text-gray-700 uppercase hidden md:inline">Xin chào, NGUYỄN NGỌC THANH</span>
          <!-- ChevronDown Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  @Input() title: string = 'Sổ bé ngoan';
  @Output() goBackHome = new EventEmitter<void>();
  @Output() toggleSidebar = new EventEmitter<void>();

  goBack() {
    this.goBackHome.emit();
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
