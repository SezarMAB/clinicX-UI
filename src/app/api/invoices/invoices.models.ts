import { IsoDateString } from '../core/http-error-handler';
import { Page } from '../core/api-config';

export interface FinancialRecordDto {
  id: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  invoiceDate: string;
  dueDate?: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  status: InvoiceStatus;
  items: InvoiceItemDto[];
  payments: PaymentDto[];
  notes?: string;
}

export interface InvoiceItemDto {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  treatmentId?: string;
}

export interface PaymentDto {
  id: string;
  paymentDate: IsoDateString;
  amount: number;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
}

export interface InvoiceCreateRequest {
  patientId: string;
  invoiceDate: string;
  dueDate?: string;
  items: InvoiceItemCreateRequest[];
  notes?: string;
}

export interface InvoiceItemCreateRequest {
  description: string;
  quantity: number;
  unitPrice: number;
  treatmentId?: string;
}

export interface PaymentCreateRequest {
  paymentDate: string;
  amount: number;
  paymentMethod: string;
  referenceNumber?: string;
  notes?: string;
}

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED'
}

export type PageFinancialRecordDto = Page<FinancialRecordDto>;
