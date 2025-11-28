
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from '../types';

@Component({
  selector: 'app-health-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
      <!-- Toolbar -->
      <div class="p-4 border-b border-gray-200 flex items-center justify-between text-sm text-gray-600 flex-shrink-0">
        <div class="flex items-center">
            <span>Xem</span>
            <select class="mx-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none">
            <option>25</option>
            <option>50</option>
            <option>100</option>
            </select>
            <span>dòng</span>
        </div>
        
        <div class="flex items-center gap-2">
           <span class="mr-2">Trước</span>
           <button class="w-8 h-8 flex items-center justify-center bg-[#1976d2] text-white rounded text-xs font-medium">1</button>
           <button class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xs font-medium">2</button>
           <button class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xs font-medium">3</button>
           <span class="mx-1">...</span>
           <span class="ml-2">Tiếp</span>
        </div>
      </div>
      
      <div class="px-4 py-2 bg-gray-50 text-xs text-gray-500 border-b border-gray-200 flex-shrink-0">
        Đang xem 1 đến {{ students.length > 25 ? 25 : students.length }} trong tổng số {{ students.length }} dòng
      </div>

      <!-- Table Container -->
      <div class="overflow-x-auto flex-1">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-[#1976d2] text-white text-[11px] font-bold text-center">
              <th class="px-2 py-3 border-r border-blue-400/30 w-10"></th>
              <th class="px-2 py-3 border-r border-blue-400/30">Mã số</th>
              <th class="px-3 py-3 border-r border-blue-400/30 text-left">Học Sinh</th>
              <th class="px-2 py-3 border-r border-blue-400/30">Các thông tin<br>chung</th>
              <th class="px-2 py-3 border-r border-blue-400/30">Theo dõi sức<br>khỏe</th>
              <th class="px-2 py-3 border-r border-blue-400/30">Khám sức<br>khỏe</th>
              <th class="px-2 py-3 border-r border-blue-400/30">Biểu đồ<br>dinh dưỡng</th>
              <th class="px-2 py-3 border-r border-blue-400/30 w-16">Xem sổ</th>
              <th class="px-2 py-3 border-r border-blue-400/30 w-16">Xuất PDF</th>
              <th class="px-2 py-3 w-16">Xuất XML</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let student of students; let i = index" class="hover:bg-gray-50 transition-colors">
              <td class="px-2 py-3 text-sm text-gray-600 text-center">{{ i + 1 }}</td>
              <td class="px-2 py-3 text-sm text-gray-700 text-center font-mono text-xs whitespace-nowrap">{{ student.code }}</td>
              <td class="px-3 py-3">
                <div class="flex flex-col">
                  <span class="text-xs font-semibold text-gray-700 uppercase leading-tight">{{ student.fullName }}</span>
                  <div class="flex items-center gap-1 mt-0.5">
                    <span class="text-[10px] text-gray-500">{{ student.studentId }}</span>
                    <span class="text-[9px] bg-blue-50 text-blue-600 px-1 rounded border border-blue-100">{{ student.className }}</span>
                  </div>
                </div>
              </td>
              
              <!-- Action Columns -->
              <td class="px-2 py-3 text-center">
                <div class="flex flex-col items-center justify-center gap-1 text-gray-600 cursor-pointer hover:text-blue-600 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-[10px] font-medium uppercase">phần I</span>
                </div>
              </td>
              <td class="px-2 py-3 text-center">
                <div class="flex flex-col items-center justify-center gap-1 text-gray-600 cursor-pointer hover:text-blue-600 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-[10px] font-medium uppercase">phần II</span>
                </div>
              </td>
              <td class="px-2 py-3 text-center">
                <div class="flex flex-col items-center justify-center gap-1 text-gray-600 cursor-pointer hover:text-blue-600 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-[10px] font-medium uppercase">phần III</span>
                </div>
              </td>
              <td class="px-2 py-3 text-center">
                <div class="flex flex-col items-center justify-center gap-1 text-gray-600 cursor-pointer hover:text-blue-600 group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-[10px] font-medium uppercase">phần VI</span>
                </div>
              </td>

              <td class="px-2 py-3 text-center">
                <a href="#" class="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline block whitespace-nowrap">Xem sổ</a>
              </td>
              <td class="px-2 py-3 text-center">
                <a href="#" class="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline block whitespace-nowrap">Xuất PDF</a>
              </td>
              <td class="px-2 py-3 text-center">
                <a href="#" class="text-blue-600 hover:text-blue-800 text-xs font-medium hover:underline block whitespace-nowrap">Xuất XML</a>
              </td>
            </tr>
            <tr *ngIf="students.length === 0">
               <td colspan="10" class="text-center p-6 text-gray-500">Chưa khởi tạo dữ liệu sổ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class HealthTableComponent {
  @Input() students: Student[] = [];
}
