interface BaseEntity {
  createBy: string
  updateBy?: string
  createTime: string | Date
  updateTime?: string | Date
  delFlag: string | number
}
interface BillEntity {
  billId?: number
  billAmount: number | undefined
  billTitle: string
  billType: string
  billTime: string | Date
}

type BillVOEntity = BillEntity & BaseEntity


interface UserEntity {
  userId?: number
  username: string
  password?: string
  nickname: string
  avatar: string
  isAdmin: string
  locked: string
}

type UserVOEntity = UserEntity & BaseEntity
