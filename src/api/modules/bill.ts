import api from '..'

export default {
  getBillList: (params: any) => api.get('/bill/list', { params: params }),
  getBillDetail: (billId: number) => api.get(`/bill/${billId}`),
  addBill: (params: any) => api.post('/bill', params),
  editBill: (params: any) => api.put('/bill/edit', params),
  deleteBill: (billId: number) => api.delete(`/bill/${billId}`),
}
