
import { Student, MenuItem, Teacher } from './types';

// --- 1. MOCK TEACHERS (10 Giáo viên) ---
export const MOCK_TEACHERS: Teacher[] = [
  { 
    id: 101, name: 'Nguyễn Thị An', shortName: 'Cô An', 
    cccd: '079182000123', dob: '12/05/1990', gender: 'Nữ', 
    phone: '0909123456', email: 'nguyenthian@mnbengoan.edu.vn', address: '123 Nguyễn Văn Cừ, Q.5, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=An'
  },
  { 
    id: 102, name: 'Trần Thị Ngọc', shortName: 'Cô Ngọc', 
    cccd: '079185000456', dob: '20/10/1992', gender: 'Nữ', 
    phone: '0909888777', email: 'tranthingoc@mnbengoan.edu.vn', address: '456 Lê Hồng Phong, Q.10, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ngoc'
  },
  { 
    id: 103, name: 'Lê Thu Thúy', shortName: 'Cô Thúy', 
    cccd: '079188000789', dob: '15/08/1995', gender: 'Nữ', 
    phone: '0912345678', email: 'lethuthuy@mnbengoan.edu.vn', address: '789 Trần Hưng Đạo, Q.1, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thuy'
  },
  { 
    id: 104, name: 'Phạm Văn Nam', shortName: 'Thầy Nam', 
    cccd: '079080000111', dob: '01/01/1988', gender: 'Nam', 
    phone: '0988765432', email: 'phamvannam@mnbengoan.edu.vn', address: '101 Nguyễn Trãi, Q.5, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nam'
  },
  { 
    id: 105, name: 'Hoàng Thị Lê', shortName: 'Cô Lê', 
    cccd: '079190000222', dob: '05/09/1993', gender: 'Nữ', 
    phone: '0977665544', email: 'hoangthile@mnbengoan.edu.vn', address: '202 Lý Thường Kiệt, Q.11, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Le'
  },
  { 
    id: 106, name: 'Vũ Thị Cúc', shortName: 'Cô Cúc', 
    cccd: '079195000333', dob: '25/12/1998', gender: 'Nữ', 
    phone: '0933221100', email: 'vuthicuc@mnbengoan.edu.vn', address: '303 Ba Tháng Hai, Q.10, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Cuc'
  },
  { 
    id: 107, name: 'Đặng Thu Thảo', shortName: 'Cô Thảo', 
    cccd: '079196000444', dob: '10/03/1996', gender: 'Nữ', 
    phone: '0933445566', email: 'dangthuthao@mnbengoan.edu.vn', address: '12 Võ Văn Tần, Q.3, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thao'
  },
  { 
    id: 108, name: 'Bùi Thị Dung', shortName: 'Cô Dung', 
    cccd: '079197000555', dob: '14/07/1994', gender: 'Nữ', 
    phone: '0911223344', email: 'buithidung@mnbengoan.edu.vn', address: '56 Nguyễn Thị Minh Khai, Q.1, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dung'
  },
  { 
    id: 109, name: 'Trịnh Văn Hùng', shortName: 'Thầy Hùng', 
    cccd: '079198000666', dob: '22/11/1985', gender: 'Nam', 
    phone: '0905123123', email: 'trinhvanhung@mnbengoan.edu.vn', address: '88 Pasteur, Q.1, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hung'
  },
  { 
    id: 110, name: 'Phan Thị Mai', shortName: 'Cô Mai', 
    cccd: '079199000777', dob: '30/04/1997', gender: 'Nữ', 
    phone: '0908777888', email: 'phanthimai@mnbengoan.edu.vn', address: '99 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mai'
  },
];

// --- GRADE & CLASS STRUCTURE ---
export const GRADE_STRUCTURE = {
  'mau-giao': [
    { name: 'Khối Mầm', classes: ['Mầm 1', 'Mầm 2'] },
    { name: 'Khối Chồi', classes: ['Chồi 1', 'Chồi 2'] },
    { name: 'Khối Lá', classes: ['Lá 1', 'Lá 2'] },
  ],
  'nha-tre': [
    { name: 'Nhóm 6-18 tháng', classes: ['Nhóm 6-18 tháng'] },
    { name: 'Nhóm 19-24 tháng', classes: ['Nhóm 19-24 tháng'] },
    { name: 'Nhóm 25-36 tháng', classes: ['Nhóm 25-36 tháng'] },
  ]
};

// --- 2. GENERATE STUDENTS (5 Học sinh mỗi lớp) ---
const LAST_NAMES = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Huỳnh', 'Hoàng', 'Phan', 'Vũ', 'Võ', 'Đặng'];
const MIDDLE_NAMES_BOY = ['Văn', 'Hữu', 'Đức', 'Minh', 'Thành', 'Gia', 'Tuấn'];
const MIDDLE_NAMES_GIRL = ['Thị', 'Ngọc', 'Thu', 'Thanh', 'Bảo', 'Mỹ', 'Khánh'];
const FIRST_NAMES_BOY = ['Hùng', 'Dũng', 'Nam', 'Bình', 'Khang', 'Phúc', 'Lâm', 'Huy', 'Khôi', 'Long'];
const FIRST_NAMES_GIRL = ['Lan', 'Huệ', 'Cúc', 'Mai', 'Hân', 'Nhi', 'Vy', 'Trang', 'Tú', 'Châu'];

function generateStudents(): Student[] {
  let students: Student[] = [];
  let idCounter = 1;

  // Flatten classes from GRADE_STRUCTURE for generation
  const allMGClasses = GRADE_STRUCTURE['mau-giao'].flatMap(g => g.classes);
  const allNTClasses = GRADE_STRUCTURE['nha-tre'].flatMap(g => g.classes);
  const allClasses = [...allMGClasses, ...allNTClasses];

  allClasses.forEach((className) => {
    // Mỗi lớp 5 học sinh
    for (let i = 0; i < 5; i++) {
      const isBoy = Math.random() > 0.5;
      const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      
      let middleName = '';
      let firstName = '';
      
      if (isBoy) {
        middleName = MIDDLE_NAMES_BOY[Math.floor(Math.random() * MIDDLE_NAMES_BOY.length)];
        firstName = FIRST_NAMES_BOY[Math.floor(Math.random() * FIRST_NAMES_BOY.length)];
      } else {
        middleName = MIDDLE_NAMES_GIRL[Math.floor(Math.random() * MIDDLE_NAMES_GIRL.length)];
        firstName = FIRST_NAMES_GIRL[Math.floor(Math.random() * FIRST_NAMES_GIRL.length)];
      }

      const fullName = `${lastName} ${middleName} ${firstName}`.toUpperCase();
      const codeBase = Math.floor(1000000000 + Math.random() * 9000000000).toString(); // 10 digits
      
      // Randomly assign 0-3 teachers
      const assignedTeacherIds: number[] = [];
      const numTeachers = Math.floor(Math.random() * 3); // 0, 1, or 2 teachers initially
      if (numTeachers > 0) {
        // Pick random unique teachers
        const shuffledTeachers = [...MOCK_TEACHERS].sort(() => 0.5 - Math.random());
        for(let j=0; j<numTeachers; j++) {
           assignedTeacherIds.push(shuffledTeachers[j].id);
        }
      }

      students.push({
        id: idCounter++,
        code: `SBN${codeBase}`,
        studentId: codeBase,
        fullName: fullName,
        className: className,
        assignedTeacherIds: assignedTeacherIds
      });
    }
  });

  return students;
}

// Singleton Data Source
export const MOCK_STUDENTS: Student[] = generateStudents();

// --- SIDEBAR MENUS ---

export const MENU_HEALTH: MenuItem[] = [
  { id: 'sk-mau-giao', label: 'Sổ sức khỏe mẫu giáo' },
  { id: 'sk-nha-tre', label: 'Sổ sức khỏe nhà trẻ' },
];

export const MENU_SBN: MenuItem[] = [
  { id: 'mau-giao', label: 'Sổ Bé Ngoan - Mẫu giáo' },
  { id: 'nha-tre', label: 'Sổ Bé Ngoan - Nhà trẻ' },
];

export const MENU_ASSIGNMENT: MenuItem[] = [
  { id: 'phan-cong', label: 'Phân công giáo viên' },
];