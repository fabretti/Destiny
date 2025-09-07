export const formatNumber = (value: string | number | null | undefined): string => {
  if (!value && value !== 0) return '0'
  
  const numValue = typeof value === 'string' ? parseFloat(value) : value
  
  if (isNaN(numValue)) return '0'
  
  return numValue.toLocaleString('ru-RU', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}
export const formatCurrency = (value: string | number | null | undefined, currency: string = 'Toll'): string => {
  const formattedNumber = formatNumber(value)
  return `${formattedNumber} ${currency}`
}
