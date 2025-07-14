import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService, PaginationParams } from '../../core';
import { 
  InvoiceCreateRequest,
  PaymentCreateRequest,
  FinancialRecordDto,
  PageFinancialRecordDto
} from './invoices.models';

/**
 * Service for managing invoice and payment operations.
 */
@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private readonly basePath = '/api/v1/invoices';

  constructor(private api: ApiService) {}

  /**
   * Creates a new invoice for a patient with auto-generated invoice number.
   * @param invoice - The invoice data to create
   * @returns Observable of the created invoice
   */
  createInvoice(invoice: InvoiceCreateRequest): Observable<FinancialRecordDto> {
    return this.api.post<FinancialRecordDto>(this.basePath, invoice);
  }

  /**
   * Records a payment against an existing invoice and updates patient balance.
   * @param invoiceId - Invoice UUID
   * @param payment - The payment data to record
   * @returns Observable of the updated financial record
   */
  addPayment(invoiceId: string, payment: PaymentCreateRequest): Observable<FinancialRecordDto> {
    return this.api.post<FinancialRecordDto>(`${this.basePath}/${invoiceId}/payments`, payment);
  }

  /**
   * Retrieves paginated financial records (invoices and payments) for a patient.
   * @param patientId - Patient UUID
   * @param params - Pagination parameters
   * @returns Observable of paginated financial records
   */
  getPatientFinancialRecords(
    patientId: string,
    params?: PaginationParams
  ): Observable<PageFinancialRecordDto> {
    const httpParams = this.buildPaginationParams(params);
    return this.api.get<PageFinancialRecordDto>(
      `${this.basePath}/patient/${patientId}`, 
      httpParams
    );
  }

  /**
   * Retrieves the next sequential invoice number for preview purposes.
   * @returns Observable of the next invoice number
   */
  getNextInvoiceNumber(): Observable<string> {
    return this.api.get<string>(`${this.basePath}/next-invoice-number`);
  }

  /**
   * Manually recalculates patient balance based on all invoices and payments.
   * @param patientId - Patient UUID
   * @returns Observable of the recalculated balance
   */
  recalculatePatientBalance(patientId: string): Observable<number> {
    return this.api.post<number>(
      `${this.basePath}/patient/${patientId}/recalculate-balance`, 
      {}
    );
  }

  /**
   * Builds HttpParams from pagination parameters.
   * @param params - Pagination parameters
   * @returns HttpParams object
   */
  private buildPaginationParams(params?: PaginationParams): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', params.page.toString());
      }
      if (params.size !== undefined) {
        httpParams = httpParams.set('size', params.size.toString());
      }
      if (params.sort) {
        httpParams = httpParams.set('sort', params.sort);
      }
    }
    
    return httpParams;
  }
}