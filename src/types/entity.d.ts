interface BaseEntity {
  createBy: string
  updateBy?: string
  createTime: string | Date
  updateTime?: string | Date
  delFlag: string | number
}
export interface BillEntity {
  billId?: number
  billAmount: number | undefined
  billTitle: string
  billType: string
  billTime: string | Date
}

export type BillVOEntity = BillEntity & BaseEntity
