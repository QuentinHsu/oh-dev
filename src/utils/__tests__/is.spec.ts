import { describe, expect, it } from 'vitest'

import { isColor } from '../is'

describe('utils is.ts isColor', () => {
  it.concurrent('valid color.', () => {
    expect(isColor('#000000')).toBe(true)
    expect(isColor('#FFF')).toBe(true)
    expect(isColor('#FFf')).toBe(true)
    expect(isColor('rgb(255, 255, 255)')).toBe(true)
    expect(isColor('rgba(0, 0, 0, 0.5)')).toBe(true)
    expect(isColor('hsl(0, 100%, 50%)')).toBe(true)
    expect(isColor('hsla(120%, 100%, 50%, 0.8)')).toBe(true)
  })
  it.concurrent('invalid color.', () => {
    expect(isColor('000000')).toBe(false)
    expect(isColor('FFF')).toBe(false)
    expect(isColor('(255, 255, 255)')).toBe(false)
    expect(isColor('(0, 0, 0, 0.5)')).toBe(false)
    expect(isColor('(0, 100%, 50%)')).toBe(false)
    expect(isColor('(120%, 100%, 50%, 0.8)')).toBe(false)
    // space character
    expect(isColor('')).toBe(false)
    expect(isColor('   ')).toBe(false)
  })
})
