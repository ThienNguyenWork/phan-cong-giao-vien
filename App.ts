import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// Sửa đường dẫn import: BỎ đuôi '.ts' khỏi các Component để phù hợp với quy tắc của Angular CLI
import { SidebarComponent } from './components/Sidebar';
import { HeaderComponent } from './components/Header';
import { FilterSectionComponent } from './components/FilterSection';
import { StudentTableComponent } from './components/StudentTable';
import { TeacherAssignmentComponent } from './components/TeacherAssignment';
import { LandingPageComponent } from './components/LandingPage';
import { HealthTableComponent } from './components/HealthTable';
// Đã loại bỏ đuôi '.ts' khỏi types và constants để giải quyết lỗi import
import { MenuItem, Student } from './types';
import { MENU_SBN, MENU_ASSIGNMENT, MENU_HEALTH, MOCK_STUDENTS, GRADE_STRUCTURE } from './constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarComponent, 
    HeaderComponent, 
    FilterSectionComponent, 
    StudentTableComponent,
    TeacherAssignmentComponent,
    LandingPageComponent,
    HealthTableComponent
  ],
  template: `<ng-container *ngIf="viewMode === 'landing'"><app-landing-page (onSelect)="onSelectModule($event)"></app-landing-page></ng-container><div *ngIf="viewMode === 'app'" class="flex h-screen w-screen bg-[#f3f4f6]"><app-sidebar *ngIf="currentView !== 'phan-cong' && isSidebarOpen" [items]="sidebarItems" [activeId]="currentView" (menuChange)="onViewChange($event)"></app-sidebar><div class="flex-1 flex flex-col w-full h-full transition-all duration-300 min-w-0"><app-header [title]="getHeaderTitle()" (toggleSidebar)="onToggleSidebar()" (goBackHome)="onBackHome()"></app-header><main class="flex-1 w-full overflow-auto flex flex-col"><div class="px-6 pt-6 pb-0"><h2 class="text-xl font-medium text-gray-800 text-center">{{ getPageTitle() }}</h2></div><div class="flex-1 w-full overflow-auto px-6 py-6"><ng-container *ngIf="currentView === 'mau-giao' || currentView === 'nha-tre'"><app-filter-section [context]="getFilterContext()" (onFilterChange)="handleFilterChange($event)"></app-filter-section><app-student-table [students]="displayStudents"></app-student-table></ng-container><ng-container *ngIf="currentView === 'sk-mau-giao' || currentView === 'sk-nha-tre'"><app-filter-section [context]="getFilterContext()" (onFilterChange)="handleFilterChange($event)"></app-filter-section><app-health-table [students]="displayStudents"></app-health-table></ng-container><ng-container *ngIf="currentView === 'phan-cong'"><app-teacher-assignment></app-teacher-assignment></ng-container></div></main></div></div>`
})
export class AppComponent {
  viewMode: 'landing' | 'app' = 'landing';
  currentView: string = '';
  sidebarItems: MenuItem[] = [];
  isSidebarOpen: boolean = true;

  // Data State
  allStudents: Student[] = MOCK_STUDENTS;
  displayStudents: Student[] = [];

  onSelectModule(type: 'sbn' | 'assign' | 'health') {
    this.viewMode = 'app';
    // Reset sidebar state to open when entering a module
    this.isSidebarOpen = true;

    if (type === 'sbn') {
      this.sidebarItems = MENU_SBN;
      this.currentView = 'mau-giao';
    } else if (type === 'health') {
      this.sidebarItems = MENU_HEALTH;
      this.currentView = 'sk-mau-giao';
    } else {
      this.sidebarItems = MENU_ASSIGNMENT;
      this.currentView = 'phan-cong';
    }
    this.resetDisplayData();
  }

  onBackHome() {
    this.viewMode = 'landing';
    this.currentView = '';
    this.sidebarItems = [];
  }

  onViewChange(viewId: string) {
    this.currentView = viewId;
    this.resetDisplayData();
  }

  resetDisplayData() {
     // Start empty. Data is only loaded when "Khởi tạo sổ" is clicked
     this.displayStudents = [];
  }

  handleFilterChange(filter: any) {
    const context = this.getFilterContext();
    
    this.displayStudents = this.allStudents.filter(student => {
       // 1. Context Filter
       let matchContext = false;
       if (context === 'mau-giao') {
          matchContext = student.className.includes('Mầm') || student.className.includes('Chồi') || student.className.includes('Lá');
       } else {
          matchContext = student.className.includes('tháng');
       }
       if (!matchContext) return false;

       // 2. Grade Filter
       if (filter.grade) {
          // If a grade is selected (e.g., "Khối Mầm"), check if class belongs to that grade
          const gradeInfo = GRADE_STRUCTURE[context].find(g => g.name === filter.grade);
          if (gradeInfo && !gradeInfo.classes.includes(student.className)) {
             return false;
          }
       }

       // 3. Class Filter
       if (filter.className && student.className !== filter.className) {
          return false;
       }

       // 4. Keyword Filter (Name or Code)
       if (filter.keyword) {
          const term = filter.keyword.toLowerCase();
          if (!student.fullName.toLowerCase().includes(term) && !student.code.toLowerCase().includes(term)) {
             return false;
          }
       }

       // 5. Exact Code Filter
       if (filter.code) {
          if (!student.code.includes(filter.code) && !student.studentId.includes(filter.code)) {
             return false;
          }
       }

       return true;
    });
  }

  onToggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getFilterContext(): 'mau-giao' | 'nha-tre' {
    if (this.currentView.includes('nha-tre')) {
      return 'nha-tre';
    }
    return 'mau-giao';
  }

  // Returns title for the top header bar
  getHeaderTitle(): string {
    if (this.currentView === 'phan-cong') {
      return 'Phân công giáo viên';
    }
    if (this.currentView.startsWith('sk-')) {
      return 'Sổ theo dõi sức khoẻ trẻ';
    }
    return 'Sổ bé ngoan';
  }

  // Returns title for the page content h2
  getPageTitle(): string {
    switch (this.currentView) {
      case 'mau-giao': return 'Sổ Bé Ngoan - Trẻ Mẫu Giáo';
      case 'nha-tre': return 'Sổ Bé Ngoan - Nhà Trẻ';
      case 'phan-cong': return 'Phân Công Giáo Viên';
      case 'sk-mau-giao': return 'Sổ Sức khỏe Điện tử - Trẻ Mẫu Giáo';
      case 'sk-nha-tre': return 'Sổ Sức khỏe Điện tử - Nhà Trẻ';
      default: return 'Trang quản lý';
    }
  }
}
