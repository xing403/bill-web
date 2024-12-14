
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface PromiseResponse<T> {
  code: number
  data: T
  message: string
  error: string
}

interface ResponseTableVO<T> {
  data: Array<T>
  pageNum: number
  pageSize: number
  total: number
}
interface PromiseResponseTableVO<T> extends PromiseResponse {
  data: ResponseTableVO<T>
}
