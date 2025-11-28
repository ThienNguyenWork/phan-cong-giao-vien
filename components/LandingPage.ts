
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <!-- Top Purple Header -->
      <header class="bg-[#5b5bdc] h-16 flex items-center px-6 justify-between text-white shadow-md">
        <div class="flex items-center gap-3">
          <button class="p-1 hover:bg-white/10 rounded">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          <!-- Logo Circle Mockup -->
          <div class="w-10 h-10 rounded-full bg-white border-2 border-red-400 flex items-center justify-center p-0.5 relative overflow-hidden">
             <!-- Colorful ring effect mockup -->
             <div class="absolute inset-0 border-4 border-yellow-400 rounded-full opacity-50"></div>
             <span class="text-[8px] font-bold text-blue-600">EKIDS</span>
          </div>
          <span class="font-bold text-lg tracking-wide">MN BÉ NGOAN 3</span>
        </div>

        <div class="flex items-center gap-4 text-sm font-medium">
          <button class="bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Liên hệ
          </button>
          <button class="bg-white/10 px-3 py-1.5 rounded hover:bg-white/20 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></svg>
            Hướng dẫn sử dụng
          </button>
          <div class="flex items-center gap-2 bg-blue-100/20 px-3 py-1.5 rounded-full">
             <div class="w-5 h-5 bg-gray-400 rounded-full text-white flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
             </div>
             <span>Xin chào, NGUYỄN NGỌC THANH</span>
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 flex items-center justify-center p-6">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden min-h-[400px]">
           <div class="p-8 pb-4">
              <h2 class="text-xl font-bold text-gray-900">Hệ thống quản lý trường học</h2>
              <p class="text-gray-500 mt-1">Chọn chức năng bạn muốn sử dụng</p>
           </div>

           <div class="p-8 pt-4">
              <!-- Green Header Block -->
              <div class="bg-[#1e7e34] text-white font-bold py-3 px-4 uppercase text-sm tracking-wide rounded-t-md">
                 QUẢN LÝ HOẠT ĐỘNG CỦA NHÀ TRƯỜNG
              </div>
              
              <!-- Card Content -->
              <div class="border border-t-0 border-gray-200 rounded-b-md p-6 bg-white min-h-[200px]">
                 <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">

                    <!-- Module NEW: Sổ theo dõi sức khỏe -->
                    <button (click)="selectModule('health')" class="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md hover:bg-blue-50 transition-all group h-32 justify-center">
                       <div class="w-12 h-12 bg-red-100 rounded text-red-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <!-- Heart/Health Icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                       </div>
                       <span class="text-sm font-medium text-gray-700 group-hover:text-blue-700 text-center">Sổ theo dõi sức khoẻ trẻ</span>
                    </button>
                    
                    <!-- Module 1: Sổ bé ngoan -->
                    <button (click)="selectModule('sbn')" class="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md hover:bg-blue-50 transition-all group h-32 justify-center">
                       <div class="w-12 h-12 bg-blue-200 rounded text-blue-600 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <!-- Notebook Icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                       </div>
                       <span class="text-sm font-medium text-gray-700 group-hover:text-blue-700">Sổ bé ngoan</span>
                    </button>

                     <!-- Module 2: Phân công giáo viên -->
                    <button (click)="selectModule('assign')" class="flex flex-col items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-md hover:bg-blue-50 transition-all group h-32 justify-center">
                       <div class="w-12 h-12 bg-green-200 rounded text-green-700 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <!-- Users/Assign Icon -->
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                       </div>
                       <span class="text-sm font-medium text-gray-700 group-hover:text-blue-700">Phân công giáo viên</span>
                    </button>

                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  `
})
export class LandingPageComponent {
  @Output() onSelect = new EventEmitter<'sbn' | 'assign' | 'health'>();

  selectModule(type: 'sbn' | 'assign' | 'health') {
    this.onSelect.emit(type);
  }
}
