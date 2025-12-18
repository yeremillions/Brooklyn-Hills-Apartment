/**
 * Format number as Nigerian Naira
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₦25,000")
 */
export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`
}

/**
 * Parse Naira string to number
 * @param value - The Naira string (e.g., "₦25,000" or "25000")
 * @returns Parsed number
 */
export function parseNaira(value: string): number {
  const cleaned = value.replace(/[₦,\s]/g, '')
  return parseFloat(cleaned) || 0
}

/**
 * Calculate total booking cost
 */
export function calculateBookingTotal(
  nightlyRate: number,
  nights: number,
  cleaningFee: number,
  serviceChargePercent: number
): {
  subtotal: number
  cleaningFee: number
  serviceCharge: number
  total: number
} {
  const subtotal = nightlyRate * nights
  const serviceCharge = (subtotal * serviceChargePercent) / 100
  const total = subtotal + cleaningFee + serviceCharge

  return {
    subtotal,
    cleaningFee,
    serviceCharge,
    total,
  }
}
