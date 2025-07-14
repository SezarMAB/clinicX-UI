/**
 * Clinic information data.
 */
export interface ClinicInfoDto {
  /** Clinic ID status */
  id: boolean;
  /** Clinic name */
  name: string;
  /** Address */
  address: string;
  /** Phone number */
  phoneNumber: string;
  /** Email address */
  email: string;
  /** Timezone */
  timezone: string;
  /** Created at timestamp */
  createdAt: string;
  /** Updated at timestamp */
  updatedAt: string;
}

/**
 * Request to update clinic information.
 */
export interface ClinicInfoUpdateRequest {
  /** Clinic name */
  name: string;
  /** Address */
  address?: string;
  /** Phone number */
  phoneNumber?: string;
  /** Email address */
  email?: string;
  /** Timezone */
  timezone: string;
}