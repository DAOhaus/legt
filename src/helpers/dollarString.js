const toExport = (number) => new Intl.NumberFormat('usd', { style: 'currency', currency: 'USD' }).format(number).replace(/\D00(?=\D*$)/, '')
export default toExport 