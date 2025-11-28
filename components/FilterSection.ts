
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GRADE_STRUCTURE } from '../constants';

@Component({
  selector: 'app-filter-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
      
      <!-- UNIFIED FILTER LAYOUT -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 p-6">
        
        <!-- Filter 1: Khối (Grade) -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-600">Khối</label>
          <div class="relative">
            <select 
              (change)="onGradeChange($event)"
              class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white">
              <option value="">Tất cả</option>
              <option *ngFor="let grade of grades" [value]="grade.name">{{ grade.name }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <!-- Filter 2: Lớp (Class) - Dependent on Grade -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-600">Lớp</label>
          <div class="relative">
            <select 
              (change)="onClassChange($event)"
              [disabled]="!selectedGrade"
              class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 appearance-none bg-white disabled:bg-gray-100 disabled:text-gray-400">
              <option value="">{{ selectedGrade ? 'Tất cả lớp' : 'Chọn khối trước' }}</option>
              <option *ngFor="let className of availableClasses" [value]="className">{{ className }}</option>
            </select>
            <div class="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <!-- Filter 3: Tìm kiếm -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-600">Tìm kiếm (Tên | Mã HS)</label>
          <input 
            type="text" 
            (input)="onKeywordChange($event)"
            placeholder="Gõ từ khóa..." 
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
          />
        </div>

        <!-- Filter 4: Mã số -->
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-semibold text-gray-600">Mã số / Định danh</label>
          <input 
            type="text" 
            (input)="onCodeChange($event)"
            placeholder="Nhập mã..." 
            class="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 placeholder-gray-400"
          />
        </div>
      </div>

      <div class="flex justify-end px-6 pb-6">
        <button 
          (click)="emitFilter()"
          class="bg-[#5b5bdc] hover:bg-[#4a4ab8] text-white font-medium py-2 px-6 rounded text-sm shadow-sm transition-colors uppercase">
          Khởi tạo sổ
        </button>
      </div>
      
    </div>
  `
})
export class FilterSectionComponent implements OnChanges {
  @Input() context: 'mau-giao' | 'nha-tre' = 'mau-giao';
  @Output() onFilterChange = new EventEmitter<any>();

  grades: any[] = [];
  availableClasses: string[] = [];

  selectedGrade: string = '';
  selectedClass: string = '';
  keyword: string = '';
  code: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['context']) {
      // Load grades based on context
      this.grades = GRADE_STRUCTURE[this.context] || [];
      this.resetFilters();
    }
  }

  resetFilters() {
    this.selectedGrade = '';
    this.selectedClass = '';
    this.availableClasses = [];
    // Do NOT emit filter automatically here. We want empty table initially.
  }

  onGradeChange(event: any) {
    this.selectedGrade = event.target.value;
    this.selectedClass = ''; // Reset class when grade changes
    
    // Update available classes
    const gradeObj = this.grades.find(g => g.name === this.selectedGrade);
    this.availableClasses = gradeObj ? gradeObj.classes : [];
    
    // Do not emit filter yet, wait for button click
  }

  onClassChange(event: any) {
    this.selectedClass = event.target.value;
    // Do not emit filter yet, wait for button click
  }

  onKeywordChange(event: any) {
    this.keyword = event.target.value;
    // Do not emit filter yet, wait for button click
  }

  onCodeChange(event: any) {
    this.code = event.target.value;
    // Do not emit filter yet, wait for button click
  }

  emitFilter() {
    this.onFilterChange.emit({
      grade: this.selectedGrade,
      className: this.selectedClass,
      keyword: this.keyword,
      code: this.code
    });
  }
}
