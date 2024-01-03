import { describe, expect, it } from 'vitest'
import { copyText } from '../index'

describe('utils index.ts copyText', () => {
  it.concurrent('text', () => {
    expect(copyText('oh-dev')).toBe(true)
  })
})
