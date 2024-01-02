/**
 * 判断传入的字符串内容是否是个颜色值
 * @param strColor
 * @return {boolean}
 */
export function isColor(strColor: string): boolean {
  // RGB or RGBA
  const rgbPattern = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
  const rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0?\.\d+|1)\)$/

  // Hexadecimal
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

  // HSL or HSLA
  const hslPattern = /^hsl\((\d{1,3}\%?),\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%\)$/
  const hslaPattern = /^hsla\((\d{1,3}\%?),\s*(100|[1-9]?\d)%,\s*(100|[1-9]?\d)%,\s*(0?\.\d+|1)\)$/

  return rgbPattern.test(strColor) || rgbaPattern.test(strColor) || hexPattern.test(strColor) || hslPattern.test(strColor) || hslaPattern.test(strColor)
}
