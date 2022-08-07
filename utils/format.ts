
const currencyOptions = {
  style: 'currency',
  currency: 'EUR',
  currencyDisplay: 'symbol'
}

export const formatCurrency = (value: number) =>
  (value / 100).toLocaleString('de-DE', currencyOptions)
