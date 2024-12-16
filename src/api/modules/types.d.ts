interface GetListParamsType {
  pageNum?: number
  pageSize?: number
}

type ResponseEntity<T> = Promise<{
  code: number
  data: T
  message: string
  error: string
}>
type ResponsePage<T> = ResponseEntity<{
  data: Array<T>
  pageNum: number
  pageSize: number
  total: number
}>
