
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student, Teacher } from '../types';
import { MOCK_TEACHERS } from '../constants';

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
      <!-- Table Toolbar -->
      <div class="p-4 border-b border-gray-200 flex items-center text-sm text-gray-600">
        <span>Show</span>
        <select class="mx-2 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none">
          <option>10</option>
          <option>25</option>
          <option>50</option>
        </select>
        <span>entries</span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[1000px]">
          <thead>
            <tr class="bg-[#1976d2] text-white text-xs font-bold uppercase tracking-wider text-left">
              <th class="px-4 py-3 w-10 border-r border-blue-400/30"></th>
              <th class="px-4 py-3 w-32 border-r border-blue-400/30">Mã số</th>
              <th class="px-4 py-3 w-48 border-r border-blue-400/30">Học sinh</th>
              <th class="px-4 py-3 border-r border-blue-400/30">Thông tin học sinh</th>
              <th class="px-4 py-3 border-r border-blue-400/30">Thông tin giáo viên</th>
              <th class="px-4 py-3 border-r border-blue-400/30">Đánh giá học sinh</th>
              <th class="px-4 py-3 border-r border-blue-400/30">Nhận xét cuối năm</th>
              <th class="px-4 py-3 w-24 text-center">Xem sổ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr *ngFor="let student of students; let i = index" class="hover:bg-gray-50 transition-colors">
              <td class="px-4 py-4 text-sm text-gray-600 text-center">{{ i + 1 }}</td>
              <td class="px-4 py-4 text-sm text-gray-700 font-medium">{{ student.code }}</td>
              <td class="px-4 py-4">
                <div class="flex flex-col">
                  <span class="text-sm font-semibold text-gray-700 uppercase">{{ student.fullName }}</span>
                  <div class="flex items-center gap-2 mt-0.5">
                    <span class="text-xs text-blue-600">{{ student.studentId }}</span>
                    <span class="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded border border-gray-200">{{ student.className }}</span>
                  </div>
                </div>
              </td>
              
              <!-- Action Columns with Icons -->
              <td class="px-4 py-4">
                <div class="flex items-center gap-1.5 text-gray-600 cursor-pointer hover:text-blue-600 group">
                  <!-- Pencil Icon -->
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-sm">Thông tin HS</span>
                </div>
              </td>
              
              <!-- INFO GV: TRIGGER MODAL -->
              <td class="px-4 py-4">
                <div (click)="openTeacherInfo(student)" class="flex items-center gap-1.5 text-gray-600 cursor-pointer hover:text-blue-600 group select-none">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-sm">Thông tin GV</span>
                </div>
              </td>

              <td class="px-4 py-4">
                <div class="flex items-center gap-1.5 text-gray-600 cursor-pointer hover:text-blue-600 group">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-sm">Đánh giá HS</span>
                </div>
              </td>
              <td class="px-4 py-4">
                <div class="flex items-center gap-1.5 text-gray-600 cursor-pointer hover:text-blue-600 group">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-orange-400 group-hover:text-blue-600"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                  <span class="text-sm">Nhận xét cuối năm</span>
                </div>
              </td>

              <td class="px-4 py-4 text-center">
                <button class="bg-[#1976d2] hover:bg-blue-700 text-white text-xs font-medium py-1.5 px-3 rounded shadow-sm transition-colors">
                  Xem sổ
                </button>
              </td>
            </tr>
            <tr *ngIf="students.length === 0">
               <td colspan="8" class="text-center p-6 text-gray-500">Chưa khởi tạo dữ liệu sổ</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Empty space filler -->
      <div class="h-4 bg-white"></div>

      <!-- ============================================== -->
      <!-- READ-ONLY TEACHER INFO MODAL -->
      <!-- ============================================== -->
      <div *ngIf="viewingStudent" class="fixed inset-0 z-[100] flex items-center justify-center">
         <!-- Backdrop -->
         <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" (click)="closeTeacherInfo()"></div>
         
         <!-- Modal Container -->
         <div class="relative bg-gray-50 rounded-lg shadow-2xl w-[95%] max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            <!-- Header (Blue) -->
            <div class="bg-[#2563eb] text-white px-6 py-4 flex items-center justify-between shrink-0">
               <div class="flex flex-col gap-1">
                 <h3 class="font-bold text-lg uppercase tracking-wide">THÔNG TIN GIÁO VIÊN - HỌC SINH</h3>
                 <div class="flex items-center gap-2">
                    <span class="text-xs bg-white/20 px-2 py-0.5 rounded text-white font-medium">HỌC SINH</span>
                    <span class="text-sm font-bold text-yellow-300 uppercase">{{ viewingStudent.fullName }}</span>
                 </div>
               </div>
               
               <button (click)="closeTeacherInfo()" class="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>

            <!-- Sub Header / Tabs -->
            <div class="px-6 py-3 bg-white border-b border-gray-200 flex items-center gap-2 text-sm font-medium text-gray-700">
               <div class="bg-[#2563eb] text-white px-3 py-1.5 rounded text-xs flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                  Năm học 2025-2026
               </div>
               
               <!-- Add Year Tab Button -->
               <button class="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors" title="Thêm năm học">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </button>
            </div>

            <!-- Body (Scrollable) -->
            <div class="p-6 overflow-y-auto">
               <div class="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div class="flex items-center justify-between mb-6">
                     <h4 class="text-lg font-semibold text-gray-800">Danh sách giáo viên</h4>
                  </div>

                  <!-- Teacher List Form -->
                  <div class="space-y-8">
                     <div *ngFor="let teacher of viewingTeachers; let idx = index" class="relative group border-b border-gray-100 last:border-0 pb-8 last:pb-0">
                        
                        <!-- Row 1: Name, CCCD, DOB -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                           <div class="md:col-span-1">
                              <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Họ và tên</label>
                              <input type="text" [value]="teacher.name" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-700 font-medium cursor-not-allowed select-none focus:outline-none">
                           </div>
                           <div class="md:col-span-1">
                               <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">CCCD / CMND</label>
                               <input type="text" [value]="teacher.cccd" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed select-none focus:outline-none">
                           </div>
                           <div class="md:col-span-1">
                               <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Ngày sinh</label>
                               <input type="text" [value]="teacher.dob" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed select-none focus:outline-none">
                           </div>
                        </div>

                        <!-- Row 2: Phone, Email, Gender -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                           <div class="md:col-span-1">
                              <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Điện thoại</label>
                              <input type="text" [value]="teacher.phone" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed select-none focus:outline-none">
                           </div>
                           <div class="md:col-span-1">
                               <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Email</label>
                               <input type="text" [value]="teacher.email" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed select-none focus:outline-none">
                           </div>
                           <div class="md:col-span-1">
                               <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Giới tính</label>
                               <input type="text" [value]="teacher.gender" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed select-none focus:outline-none">
                           </div>
                        </div>

                        <!-- Row 3: Address (Full width) -->
                        <div class="grid grid-cols-1 gap-6">
                           <div>
                              <label class="block text-xs font-semibold text-gray-500 mb-1.5 uppercase">Địa chỉ</label>
                              <input type="text" [value]="teacher.address" disabled 
                                     class="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 cursor-not-allowed select-none focus:outline-none">
                           </div>
                        </div>

                     </div>
                     <div *ngIf="viewingTeachers.length === 0" class="text-center py-8 text-gray-400 italic">
                        Chưa có thông tin giáo viên
                     </div>
                  </div>
               </div>
            </div>

            <!-- Footer -->
            <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 shrink-0">
               <button (click)="closeTeacherInfo()" class="px-6 py-2 bg-[#5b5bdc] hover:bg-[#4a4ab8] text-white rounded font-medium shadow-sm transition-colors text-sm">
                  Đóng
               </button>
            </div>
         </div>
      </div>
    </div>
  `
})
export class StudentTableComponent {
  @Input() students: Student[] = [];
  
  // Modal state
  viewingStudent: Student | null = null;
  viewingTeachers: Teacher[] = [];

  openTeacherInfo(student: Student) {
    this.viewingStudent = student;
    if (student.assignedTeacherIds && student.assignedTeacherIds.length > 0) {
      this.viewingTeachers = MOCK_TEACHERS.filter(t => student.assignedTeacherIds?.includes(t.id));
    } else {
      this.viewingTeachers = [];
    }
  }

  closeTeacherInfo() {
    this.viewingStudent = null;
    this.viewingTeachers = [];
  }
}
