
export interface Student {
  id: number;
  code: string;
  fullName: string;
  studentId: string; // The secondary ID shown below name
  className: string; // Tên lớp (Mầm, Chồi, Lá...)
  assignedTeacherIds?: number[]; 
  homeroomTeacherId?: number; // ID của giáo viên chủ nhiệm (nếu có)
}

export interface Teacher {
  id: number;
  name: string;
  shortName: string; // Tên hiển thị ngắn gọn (ví dụ: Cô An)
  cccd: string;
  dob: string;
  gender: 'Nam' | 'Nữ';
  phone: string;
  email: string; // New field
  address: string;
  avatar?: string; // URL ảnh đại diện
}

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
}