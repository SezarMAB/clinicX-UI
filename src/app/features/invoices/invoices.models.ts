import { Page } from '@core';
import { InvoiceStatus } from '@features/shared.models';

/**
 * Request to create a new invoice item.
 */
export interface InvoiceItemRequest {
  /** Procedure ID */
  procedureId: string;
  /** Quantity */
  quantity?: number;
  /** Unit price */
  unitPrice: number;
  /** Description */
  description?: string;
}

/**
 * Request to create a new invoice.
 */
export interface InvoiceCreateRequest {
  /** Patient ID */
  patientId: string;
  /** Invoice date */
  invoiceDate: string;
  /** Due date */
  dueDate: string;
  /** Invoice items */
  items: InvoiceItemRequest[];
  /** Notes */
  notes?: string;
}

/**
 * Request to create a new payment.
 */
export interface PaymentCreateRequest {
  /** Payment amount */
  amount: number;
  /** Payment date */
  paymentDate: string;
  /** Payment method */
  paymentMethod: string;
  /** Notes */
  notes?: string;
  /** Reference number */
  referenceNumber?: string;
}

/**
 * Re-export shared financial models for convenience.
 */
export type { FinancialRecordDto, PaymentInstallmentDto } from '@features/shared.models';
export { InvoiceStatus };

/**
 * Paginated financial records response.
 */
export type PageFinancialRecordDto = Page<import('@features/shared.models').FinancialRecordDto>;