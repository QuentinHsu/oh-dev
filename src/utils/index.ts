import { useClipboard } from '@vueuse/core'
import { MessagePlugin } from 'tdesign-vue-next'

/**
 * 复制文本
 * @param {string} content
 * @return {boolean}
 */
export function copyText(content: string): boolean {
  const { copy } = useClipboard()
  try {
    copy(content)
    MessagePlugin.success('Copy successful')
    return true
  }
  catch (error) {
    MessagePlugin.error('Copy failed')
    return false
  }
}
