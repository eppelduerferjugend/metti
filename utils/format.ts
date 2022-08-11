
const currencyOptions = {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol'
}

export const formatCurrency = (value: number) =>
  (value / 100).toLocaleString('de-DE', currencyOptions)

export const formatDate = (value: Date) =>
  value.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

export const formatTime = (value: Date) =>
  value.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit'
  })

export const formatDateTime = (value: Date) =>
  formatDate(value) + ' ' + formatTime(value)
