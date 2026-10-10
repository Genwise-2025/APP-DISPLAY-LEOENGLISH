export interface StudentAccount {
  id: string;
  email: string;
  fullName?: string;
  phone?: string;
  status: 'approved' | 'pending' | 'blocked';
  registeredAt: string;
  approvedAt?: string;
  notes?: string;
}

export interface StudentAuthContextType {
  students: StudentAccount[];
  currentStudent: StudentAccount | null;
  currentStudentEmail: string | null;
  isStudentApproved: boolean;
  loginStudent: (email: string, fullName?: string) => { success: boolean; status: 'approved' | 'pending' | 'blocked'; message: string };
  logoutStudent: () => void;
  approveStudent: (email: string) => void;
  blockStudent: (email: string) => void;
  unblockStudent: (email: string) => void;
  deleteStudent: (email: string) => void;
  addStudentDirectly: (email: string, status?: 'approved' | 'pending', fullName?: string) => void;
}
