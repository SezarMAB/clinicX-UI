import { inject, Injectable, Signal } from '@angular/core';
import { resource, ResourceRef } from '@angular/core';
import { ApiErrorHandler } from '../core/http-error-handler';
import { API_CONFIG, buildPaginationParams, PaginationParams, createResourceOptions } from '../core/api-config';
import {
  FinancialRecordDto,
  InvoiceCreateRequest,
  PaymentCreateRequest,
  PageFinancialRecordDto
} from './invoices.models';

@Injectable({
  providedIn: 'root'
})
export class InvoicesApi {
  private readonly config = inject(API_CONFIG);
  private readonly baseUrl = `${this.config.baseUrl}/api/v1/invoices`;
  private readonly options = createResourceOptions(this.config);

  /**
   * Create new invoice
   * Creates a new invoice for a patient with auto-generated invoice number.
   */
  createInvoice(request: Signal<InvoiceCreateRequest>): ResourceRef<FinancialRecordDto> {
    return resource({
      url: () => this.baseUrl,
      method: 'POST',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Add payment to invoice
   * Records a payment against an existing invoice and updates patient balance.
   */
  addPayment(
    invoiceId: Signal<string>,
    request: Signal<PaymentCreateRequest>
  ): ResourceRef<FinancialRecordDto> {
    return resource({
      url: () => `${this.baseUrl}/${invoiceId()}/payments`,
      method: 'POST',
      body: () => request(),
      ...this.options
    });
  }

  /**
   * Get patient financial records
   * Retrieves paginated financial records (invoices and payments) for a patient.
   */
  getPatientFinancialRecords(
    patientId: Signal<string>,
    pagination?: Signal<PaginationParams | undefined>
  ): ResourceRef<PageFinancialRecordDto> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}`,
      method: 'GET',
      params: () => pagination?.() ? buildPaginationParams(pagination()) : {},
      ...this.options
    });
  }

  /**
   * Get next invoice number
   * Retrieves the next sequential invoice number for preview purposes.
   */
  getNextInvoiceNumber(): ResourceRef<string> {
    return resource({
      url: `${this.baseUrl}/next-invoice-number`,
      method: 'GET',
      ...this.options
    });
  }

  /**
   * Recalculate patient balance
   * Manually recalculates patient balance based on all invoices and payments.
   */
  recalculatePatientBalance(patientId: Signal<string>): ResourceRef<number> {
    return resource({
      url: () => `${this.baseUrl}/patient/${patientId()}/recalculate-balance`,
      method: 'POST',
      ...this.options
    });
  }
}
