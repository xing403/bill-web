import api from '..'
import type { BillEntity, BillVOEntity } from '~/types/entity'

interface GetListParamsType {
  pageNum?: number
  pageSize?: number
}

export function getBillList(params: GetListParamsType): Promise<PromiseResponseTableVO<BillVOEntity>> {
  return api.get('/bill', { params })
}
export function insertBill(data: BillEntity): Promise<PromiseResponse<null>> {
  return api.post('/bill', data)
}
export function updateBill(data: BillEntity): Promise<PromiseResponse<null>> {
  return api.put('/bill', data)
}

export function deleteBill(billId: number): Promise<PromiseResponse<null>> {
  return api.delete(`/bill/${billId}`)
}
export function getBill(billId: number): Promise<PromiseResponse<BillVOEntity>> {
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
