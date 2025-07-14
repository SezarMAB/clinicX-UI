/**
 * Patient balance summary data.
 */
export interface PatientBalanceSummaryDto {
  /** Total balance */
  totalBalance: number;
  /** Balance status */
  balanceStatus: string;
  /** Balance description */
  balanceDescription: string;
}

/**
 * Patient financial summary view.
 */
export interface PatientFinancialSummaryView {
  /** Patient ID */
  id: string;
  /** Full name */
  fullName: string;
  /** Public facing ID */
  publicFacingId: string;
  /** Account balance */
  balance: number;
  /** Total number of invoices */
  totalInvoices: number;
  /** Number of unpaid invoices */
  unpaidInvoices: number;
  /** Total unpaid amount */
  totalUnpaid: number;
}