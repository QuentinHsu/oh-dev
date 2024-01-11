/* eslint perfectionist/sort-objects: "error" */
import { REG_EXP_URL } from '@/constants/regex'

export function parseURL(url: string): { status: string, params: { [key: string]: string }, fullPath: string } {
  if (!REG_EXP_URL.isHttpURL.test(url))
    return { fullPath: '', params: {}, status: 'error' }

  const fullPath = url.split('?')[0] || ''
  const queryString = url.split('?')[1] || ''
  const paramsArr = (queryString.split('=').length - 1) === 0 ? [`${queryString}=`] : (queryString.split('=').length - 1) === 1 ? [queryString] : (queryString.split('=').length - 1) > 1 ? queryString.split('&') : []
  const paramsObj = paramsArr.reduce(
    (obj: { [key: string]: string }, param: string) => {
      const [key, value] = param.split('=')
      obj[key] = decodeURIComponent(value)
      return obj
    },
    {},
  )
  return {
    fullPath,
    params: paramsObj,
    status: 'success',
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
