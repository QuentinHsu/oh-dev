import { REG_EXP_URL } from '@/constants/regex'

export function parseURL(url: string): { status: string, params: { [key: string]: string } } {
  if (!REG_EXP_URL.isHttpURL.test(url))
    return { status: 'error', params: {} }

  const queryString = url.split('?')[1] || ''
  const paramsArr = queryString.includes('&') ? queryString.split('&') : []
  const paramsObj = paramsArr.reduce(
    (obj: { [key: string]: string }, param: string) => {
      const [key, value] = param.split('=')
      obj[key] = decodeURIComponent(value)
      return obj
    },
    {},
  )
  return {
    status: 'success',
    params: paramsObj,
  }
}
export function onDecodeURL(content: string): string {
  let decode = decodeURIComponent(content)
  while (decode !== content) {
    content = decode
    decode = decodeURIComponent(content)
  }
  return decode
}
