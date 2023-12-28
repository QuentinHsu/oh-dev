/**
 * 判断传入的字符串内容是否是个颜色值
 * @param strColor
 * @returns
 */
export function isColor(strColor: string): boolean {
  // RGB or RGBA
  const rgbPattern = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
  const rgbaPattern = /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(0?\.\d+|1)\)$/

  // Hexadecimal
  const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
  // HSL or HSLA
  const hslPattern = /^hsl\((\d+),\s*([1-9]?[0-9]%,\s*[1-9]?[0-9]%)\)$/
  const hslaPattern
    = /^hsla\((\d+),\s*([1-9]?[0-9]%,\s*[1-9]?[0-9]%,\s*(0?\.\d+|1))\)$/
  return (
    rgbPattern.test(strColor)
    || rgbaPattern.test(strColor)
    || hexPattern.test(strColor)
    || hslPattern.test(strColor)
    || hslaPattern.test(strColor)
  )
}
