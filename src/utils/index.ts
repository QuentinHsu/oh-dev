import { useClipboard } from '@vueuse/core'
import { MessagePlugin } from 'tdesign-vue-next'

export function copyText(content: string): void {
  const { copy } = useClipboard()
  copy(content)
    .then(() => {
      MessagePlugin.success('Copy successful')
    })
    .catch(() => {
      MessagePlugin.error('Copy failed')
    })
}
