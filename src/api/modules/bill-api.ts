import api from '..'

export function getBillList(params: GetListParamsType): ResponsePage<BillVOEntity> {
  return api.get('/bill', { params })
}
export function insertBill(data: BillEntity): ResponseEntity<null> {
  return api.post('/bill', data)
}
export function updateBill(data: BillEntity): ResponseEntity<null> {
  return api.put('/bill', data)
}

export function deleteBill(billId: number): ResponseEntity<null> {
  return api.delete(`/bill/${billId}`)
}
export function getBill(billId: number): ResponseEntity<BillVOEntity> {
  return api.get(`/bill/${billId}`)
}

export default {
  getBillList,
  insertBill,
  updateBill,
  deleteBill,
  getBill,
  getBillStatistic: () => api.get('/bill/statistic'),
}
