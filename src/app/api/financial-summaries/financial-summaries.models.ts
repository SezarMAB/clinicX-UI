export interface PatientBalanceSummaryDto {
  patientId: string;
  patientName: string;
  totalInvoiced: number;
  totalPaid: number;
  currentBalance: number;
  lastPaymentDate?: string;
  lastPaymentAmount?: number;
  overdueAmount?: number;
  creditAmount?: number;
}

export interface PatientFinancialSummaryView {
  patientId: string;
  patientName: string;
  publicFacingId: string;
  currentBalance: number;
  totalInvoiced: number;
  totalPaid: number;
  lastInvoiceDate?: string;
  lastPaymentDate?: string;
  overdueAmount?: number;
  phoneNumber?: string;
  email?: string;
}
