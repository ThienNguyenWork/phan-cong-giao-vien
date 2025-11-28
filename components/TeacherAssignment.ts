
import { Component, ElementRef, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MOCK_STUDENTS, MOCK_TEACHERS } from '../constants';
import { Student, Teacher } from '../types';

@Component({
  selector: 'app-teacher-assignment',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] relative">
      
      <!-- TOAST NOTIFICATION -->
      <div *ngIf="showToast" 
           class="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border animate-in fade-in slide-in-from-top-4 duration-300"
           [ngClass]="{
             'bg-green-50 border-green-200 text-green-800': toastType === 'success',
             'bg-yellow-50 border-yellow-200 text-yellow-800': toastType === 'warning',
             'bg-red-50 border-red-200 text-red-800': toastType === 'error'
           }">
         <div [ngClass]="{
             'text-green-500': toastType === 'success',
             'text-yellow-500': toastType === 'warning',
             'text-red-500': toastType === 'error'
         }">
            <svg *ngIf="toastType === 'success'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            <svg *ngIf="toastType === 'warning'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <svg *ngIf="toastType === 'error'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
         </div>
         <div class="text-sm font-medium">{{ toastMessage }}</div>
         <button (click)="showToast = false" class="ml-2 hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
         </button>
      </div>

      <!-- LEFT COLUMN: STUDENT LIST (Main Work Area) -->
      <div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        
        <!-- Header & Search -->
        <div class="p-4 border-b border-gray-200 bg-gray-50 flex flex-col gap-3">
          <div class="flex items-center justify-between">
             <h3 class="font-semibold text-gray-800">Danh sách học sinh</h3>
             
             <div class="flex items-center gap-3">
                <!-- Total Students Badge -->
                <div class="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                    Tổng số HS: <b>{{ students.length }}</b> em
                </div>

                <div class="h-4 w-px bg-gray-300"></div>

                <!-- Unassigned Filter Toggle -->
                <button 
                  (click)="toggleUnassignedFilter()"
                  class="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border transition-colors shadow-sm"
                  [ngClass]="{
                    'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100': showUnassignedOnly,
                    'bg-white text-gray-600 border-gray-300 hover:bg-gray-50': !showUnassignedOnly
                  }">
                   <div class="w-2 h-2 rounded-full" [ngClass]="unassignedCount > 0 ? 'bg-orange-500' : 'bg-gray-300'"></div>
                   Học sinh chưa có GV: <b>{{ unassignedCount }}</b> em
                </button>

                <div class="h-4 w-px bg-gray-300"></div>

                <p class="text-xs text-gray-500">Đã chọn: <span class="font-bold text-blue-600">{{ selectedStudentIds.size }}</span> em</p>
             </div>
          </div>
          
          <div class="flex gap-3">
             <!-- Class Filter -->
             <div class="relative w-40">
                <select 
                  (change)="onClassFilterChange($event)"
                  [disabled]="showUnassignedOnly"
                  class="w-full pl-2 pr-8 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-400">
                  <option value="">Tất cả lớp</option>
                  <optgroup label="Mẫu Giáo">
                    <option value="Mầm">Khối Mầm</option>
                    <option value="Chồi">Khối Chồi</option>
                    <option value="Lá">Khối Lá</option>
                  </optgroup>
                  <optgroup label="Nhà Trẻ">
                    <option value="6-18">6-18 tháng</option>
                    <option value="19-24">19-24 tháng</option>
                    <option value="25-36">25-36 tháng</option>
                  </optgroup>
                </select>
                <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
             </div>

             <!-- Student Search -->
             <div class="relative flex-1">
                <input 
                  type="text" 
                  (input)="onStudentSearch($event)"
                  placeholder="Tìm tên hoặc mã số..." 
                  class="pl-9 pr-4 py-1.5 w-full border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none"
                >
                <div class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </div>
             </div>
          </div>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-white sticky top-0 z-10 shadow-sm text-xs font-semibold text-gray-500 uppercase">
              <tr>
                <th class="px-4 py-3 border-b w-10 bg-gray-50">
                   <input type="checkbox" [checked]="isAllSelected()" (change)="toggleSelectAll()" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
                </th>
                <th class="px-4 py-3 border-b bg-gray-50">Học sinh</th>
                <th class="px-4 py-3 border-b bg-gray-50">Lớp</th>
                <th class="px-4 py-3 border-b bg-gray-50">Giáo viên đang dạy</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr *ngFor="let student of filteredStudents" 
                  class="hover:bg-blue-50/40 transition-colors"
                  [ngClass]="{'bg-blue-50': selectedStudentIds.has(student.id)}">
                
                <!-- Checkbox Column -->
                <td class="px-4 py-3 cursor-pointer" (click)="toggleStudent(student.id)">
                   <input type="checkbox" [checked]="selectedStudentIds.has(student.id)" (change)="toggleStudent(student.id)" class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
                </td>

                <!-- Info Column -->
                <td class="px-4 py-3 cursor-pointer" (click)="toggleStudent(student.id)">
                  <div class="font-medium text-gray-800 text-sm">{{ student.fullName }}</div>
                  <div class="text-xs text-gray-500 font-mono">{{ student.code }}</div>
                </td>

                <!-- Class Column -->
                <td class="px-4 py-3 cursor-pointer text-sm text-gray-600" (click)="toggleStudent(student.id)">
                   {{ student.className }}
                </td>

                <!-- Assigned Teachers Column (Click to View Details) -->
                <td class="px-4 py-3">
                  <div class="grid grid-cols-3 gap-1.5 w-fit" 
                       (click)="openTeacherDetails(student)"
                       [ngClass]="{'cursor-pointer hover:opacity-80': getAssignedTeachers(student).length > 0}">
                    <ng-container *ngIf="getAssignedTeachers(student).length > 0; else noTeacher">
                       <span *ngFor="let t of getAssignedTeachers(student)" 
                          class="inline-flex items-center justify-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 truncate whitespace-nowrap">
                        {{ t.shortName }}
                      </span>
                    </ng-container>
                    <ng-template #noTeacher>
                      <span class="text-gray-400 select-none">-</span>
                    </ng-template>
                  </div>
                </td>
              </tr>
              <tr *ngIf="filteredStudents.length === 0">
                 <td colspan="4" class="p-8 text-center text-gray-500 text-sm">
                    {{ showUnassignedOnly ? 'Tuyệt vời! Tất cả học sinh đều đã có giáo viên.' : 'Không tìm thấy học sinh phù hợp' }}
                 </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- RIGHT COLUMN: TEACHER PALETTE (Fixed Action Area) -->
      <div class="w-full lg:w-80 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col">
        <div class="p-4 border-b border-gray-200 bg-blue-50 rounded-t-lg">
           <h3 class="font-semibold text-blue-900 flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             Chọn Giáo Viên
           </h3>
           
           <!-- Teacher Search -->
           <div class="mt-3 relative">
             <input 
               type="text" 
               (input)="onTeacherSearch($event)"
               placeholder="Tìm tên hoặc CCCD..." 
               class="w-full pl-8 pr-3 py-1.5 border border-blue-200 rounded text-sm focus:ring-1 focus:ring-blue-500 outline-none bg-white"
             >
             <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
             </div>
           </div>
        </div>

        <div class="flex-1 overflow-y-auto p-2">
           <div class="space-y-1">
             <label *ngFor="let teacher of filteredTeachers" 
                    class="flex items-center p-3 rounded-lg border transition-all cursor-pointer select-none group"
                    [ngClass]="{
                      'bg-blue-50 border-blue-300 shadow-sm': isTeacherSelected(teacher.id),
                      'bg-white border-transparent hover:bg-gray-50': !isTeacherSelected(teacher.id)
                    }">
                <input type="checkbox" 
                       class="hidden"
                       [checked]="isTeacherSelected(teacher.id)"
                       (change)="toggleTeacherSelection(teacher.id)">
                
                <div class="flex items-center justify-center w-5 h-5 rounded border mr-3 transition-colors shrink-0"
                     [ngClass]="{
                       'bg-blue-600 border-blue-600 text-white': isTeacherSelected(teacher.id),
                       'border-gray-300 bg-white': !isTeacherSelected(teacher.id)
                     }">
                     <svg *ngIf="isTeacherSelected(teacher.id)" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>

                <div class="flex-1 min-w-0">
                   <div class="text-sm font-medium truncate" [ngClass]="{'text-blue-900': isTeacherSelected(teacher.id), 'text-gray-700': !isTeacherSelected(teacher.id)}">{{ teacher.shortName }}</div>
                   <div class="text-xs text-gray-500 truncate">{{ teacher.name }}</div>
                   <div class="text-[10px] text-gray-400 font-mono mt-0.5">ID: {{ teacher.cccd.slice(-4) }}</div>
                </div>
             </label>
             <div *ngIf="filteredTeachers.length === 0" class="text-center p-4 text-xs text-gray-500 italic">
               Không tìm thấy giáo viên
             </div>
           </div>
        </div>

        <!-- ACTIONS -->
        <div class="p-4 border-t border-gray-200 bg-gray-50 rounded-b-lg space-y-3">
           <div class="flex items-center justify-between text-xs text-gray-600 mb-1">
             <span>Chọn: <b>{{ selectedTeacherIds.size }}</b> GV</span>
             <span>Áp dụng: <b>{{ selectedStudentIds.size }}</b> HS</span>
           </div>

           <button (click)="applyAssignment()" 
                   [disabled]="selectedStudentIds.size === 0 || selectedTeacherIds.size === 0"
                   class="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded shadow-sm transition-all text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Thêm phân công
           </button>

           <button (click)="removeAssignment()" 
                   [disabled]="selectedStudentIds.size === 0 || selectedTeacherIds.size === 0"
                   class="w-full flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 disabled:bg-gray-50 disabled:text-gray-300 disabled:border-gray-200 font-medium py-2.5 px-4 rounded transition-all text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              Gỡ phân công
           </button>
        </div>
      </div>

      <!-- TEACHER DETAILS MODAL (Overlay) -->
      <div *ngIf="viewingStudentDetails" class="absolute inset-0 z-50 flex items-center justify-center">
         <!-- Backdrop -->
         <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" (click)="closeTeacherDetails()"></div>
         
         <!-- Modal Content -->
         <div class="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-4xl max-h-[90%] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            <!-- Modal Header -->
            <div class="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
               <div>
                  <h3 class="font-bold text-gray-800 text-lg">Giáo viên phụ trách</h3>
                  <p class="text-sm text-gray-500">Học sinh: <span class="font-semibold text-blue-600">{{ viewingStudentDetails.fullName }}</span></p>
               </div>
               <button (click)="closeTeacherDetails()" class="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            </div>

            <!-- Modal Body (Grid of Cards) -->
            <div class="p-6 overflow-y-auto bg-gray-50/50">
               <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div *ngFor="let teacher of viewingTeachers" class="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow relative group">
                     <!-- Header (Avatar + Name) -->
                     <div class="flex items-start gap-4 mb-4">
                        <img [src]="teacher.avatar" alt="Avatar" class="w-12 h-12 rounded-full border border-gray-100 bg-gray-50 object-cover">
                        <div>
                           <h4 class="font-bold text-gray-800 text-base uppercase leading-tight">{{ teacher.name }}</h4>
                           <span class="inline-block mt-1 px-2 py-0.5 bg-green-50 text-green-700 text-[10px] font-bold uppercase rounded border border-green-100">Đang dạy</span>
                        </div>
                     </div>
                     
                     <!-- Info List -->
                     <div class="space-y-3 mb-5">
                        <div class="flex items-center gap-3 text-sm text-gray-600">
                           <span class="w-5 text-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg></span>
                           <span>{{ teacher.dob }}</span>
                           <span class="bg-blue-50 text-blue-700 px-2 rounded-full text-xs font-medium">{{ teacher.gender }}</span>
                        </div>
                         <div class="flex items-center gap-3 text-sm text-gray-600">
                           <span class="w-5 text-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M2 10h20"/><path d="M7 15h.01"/><path d="M17 15h.01"/></svg></span>
                           <span class="font-medium text-gray-800">CCCD: {{ teacher.cccd }}</span>
                        </div>
                        <div class="flex items-center gap-3 text-sm text-gray-600">
                           <span class="w-5 text-center text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></span>
                           <span>{{ teacher.phone }}</span>
                        </div>
                        <div class="flex items-start gap-3 text-sm text-gray-600">
                           <span class="w-5 text-center text-gray-400 mt-0.5"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></span>
                           <span class="text-xs leading-relaxed line-clamp-2" title="{{ teacher.address }}">{{ teacher.address }}</span>
                        </div>
                     </div>

                     <!-- Actions -->
                     <div class="flex gap-2 mt-auto">
                        <button class="flex-1 flex items-center justify-center gap-2 border border-gray-300 rounded py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                           Gọi điện
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>
  `
})
export class TeacherAssignmentComponent {
  // Use MOCK_STUDENTS direct reference to ensure synchronization across modules
  students: Student[] = MOCK_STUDENTS;
  teachers: Teacher[] = MOCK_TEACHERS;
  
  filteredStudents: Student[] = [];
  filteredTeachers: Teacher[] = [];
  // ... rest of the code remains same, logic for references is updated by removing JSON.parse/stringify ...

  selectedStudentIds: Set<number> = new Set();
  selectedTeacherIds: Set<number> = new Set();

  // Filter States
  studentSearchTerm: string = '';
  classFilter: string = '';
  teacherSearchTerm: string = '';
  
  // New state for unassigned filter
  showUnassignedOnly: boolean = false;

  // Modal State
  viewingStudentDetails: Student | null = null;
  viewingTeachers: Teacher[] = [];

  // Toast Notification State
  showToast: boolean = false;
  toastMessage: string = '';
  toastType: 'success' | 'warning' | 'error' = 'success';
  
  constructor(@Inject(ElementRef) private elementRef: ElementRef) {
    this.applyStudentFilters();
    this.filteredTeachers = [...this.teachers];
  }

  // Helper to show notification
  showNotification(message: string, type: 'success' | 'warning' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
        this.showToast = false;
    }, 3000);
  }

  // Helper to count total unassigned students
  get unassignedCount(): number {
    return this.students.filter(s => !s.assignedTeacherIds || s.assignedTeacherIds.length === 0).length;
  }

  toggleUnassignedFilter() {
    this.showUnassignedOnly = !this.showUnassignedOnly;
    this.applyStudentFilters();
  }

  // --- Student Filters ---
  onStudentSearch(event: any) {
    this.studentSearchTerm = event.target.value.toLowerCase();
    this.applyStudentFilters();
  }

  onClassFilterChange(event: any) {
    this.classFilter = event.target.value;
    this.applyStudentFilters();
  }

  getClassPriority(className: string): number {
    if (className.includes('Mầm')) return 1;
    if (className.includes('Chồi')) return 2;
    if (className.includes('Lá')) return 3;
    if (className.includes('6-18')) return 4;
    if (className.includes('19-24')) return 5;
    if (className.includes('25-36')) return 6;
    return 99; // Các lớp khác (nếu có)
  }

  applyStudentFilters() {
    // 1. Filter
    let result = this.students.filter(s => {
      const matchesSearch = s.fullName.toLowerCase().includes(this.studentSearchTerm) || 
                            s.code.toLowerCase().includes(this.studentSearchTerm);
      const matchesClass = this.classFilter ? s.className.includes(this.classFilter) : true;
      
      const isUnassigned = !s.assignedTeacherIds || s.assignedTeacherIds.length === 0;
      const matchesUnassigned = this.showUnassignedOnly ? isUnassigned : true;

      return matchesSearch && matchesClass && matchesUnassigned;
    });

    // 2. Sort: Mầm -> Chồi -> Lá -> 6-18 -> 19-24 -> 25-36
    result.sort((a, b) => {
      const priorityA = this.getClassPriority(a.className);
      const priorityB = this.getClassPriority(b.className);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      
      return a.className.localeCompare(b.className);
    });

    this.filteredStudents = result;
  }

  // --- Teacher Search ---
  onTeacherSearch(event: any) {
    this.teacherSearchTerm = event.target.value.toLowerCase();
    this.filteredTeachers = this.teachers.filter(t => 
      t.name.toLowerCase().includes(this.teacherSearchTerm) || 
      t.shortName.toLowerCase().includes(this.teacherSearchTerm) ||
      t.cccd.includes(this.teacherSearchTerm)
    );
  }

  // --- Student Selection Logic ---
  toggleStudent(id: number) {
    if (this.selectedStudentIds.has(id)) {
      this.selectedStudentIds.delete(id);
    } else {
      this.selectedStudentIds.add(id);
    }
  }

  toggleSelectAll() {
    if (this.isAllSelected()) {
      this.selectedStudentIds.clear();
    } else {
      this.filteredStudents.forEach(s => this.selectedStudentIds.add(s.id));
    }
  }

  isAllSelected(): boolean {
    return this.filteredStudents.length > 0 && this.selectedStudentIds.size === this.filteredStudents.length;
  }

  // --- Teacher Selection Logic ---
  toggleTeacherSelection(teacherId: number) {
    if (this.selectedTeacherIds.has(teacherId)) {
      this.selectedTeacherIds.delete(teacherId);
    } else {
      this.selectedTeacherIds.add(teacherId);
    }
  }

  isTeacherSelected(teacherId: number): boolean {
    return this.selectedTeacherIds.has(teacherId);
  }

  // --- Main Actions ---
  applyAssignment() {
    if (this.selectedStudentIds.size === 0 || this.selectedTeacherIds.size === 0) return;

    const teachersToAdd = Array.from(this.selectedTeacherIds);
    let countSuccess = 0;

    this.students.forEach(student => {
      if (this.selectedStudentIds.has(student.id)) {
        if (!student.assignedTeacherIds) student.assignedTeacherIds = [];
        
        let added = false;
        teachersToAdd.forEach(newId => {
          if (!student.assignedTeacherIds!.includes(newId)) {
            student.assignedTeacherIds!.push(newId);
            added = true;
          }
        });
        if (added) countSuccess++;
      }
    });

    this.applyStudentFilters(); // Refresh UI
    this.selectedTeacherIds.clear(); // Reset Teacher checkboxes
    this.selectedStudentIds.clear(); // Reset Student checkboxes
    
    this.showNotification(`Đã phân công thành công cho ${countSuccess} học sinh!`, 'success');
  }

  removeAssignment() {
     if (this.selectedStudentIds.size === 0 || this.selectedTeacherIds.size === 0) return;

     const teachersToRemove = Array.from(this.selectedTeacherIds);
     let changeCount = 0;

     this.students.forEach(student => {
       if (this.selectedStudentIds.has(student.id) && student.assignedTeacherIds) {
          const originalLength = student.assignedTeacherIds.length;
          student.assignedTeacherIds = student.assignedTeacherIds.filter(
            existingId => !teachersToRemove.includes(existingId)
          );
          if (student.assignedTeacherIds.length !== originalLength) {
             changeCount++;
          }
       }
     });

    if (changeCount === 0) {
       this.showNotification('Các học sinh đã chọn chưa được phân công bởi giáo viên này.', 'warning');
       return;
    }

    this.applyStudentFilters(); // Refresh UI
    this.selectedTeacherIds.clear(); // Reset Teacher checkboxes
    this.selectedStudentIds.clear(); // Reset Student checkboxes

    this.showNotification(`Đã gỡ phân công thành công cho ${changeCount} học sinh.`, 'success');
  }

  // --- Helpers ---
  getAssignedTeachers(student: Student): Teacher[] {
    if (!student.assignedTeacherIds) return [];
    return this.teachers.filter(t => student.assignedTeacherIds!.includes(t.id));
  }

  // --- Details Modal Logic ---
  openTeacherDetails(student: Student) {
    const assigned = this.getAssignedTeachers(student);
    if (assigned.length === 0) return;
    
    this.viewingStudentDetails = student;
    this.viewingTeachers = assigned;
  }

  closeTeacherDetails() {
    this.viewingStudentDetails = null;
    this.viewingTeachers = [];
  }
}
