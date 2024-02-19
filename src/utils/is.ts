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

/**
 * 是否是一个可转换为对象的字符串，非数组
 * @param str
 * @return boolean
 */
export function isStringConvertibleToObjectNotArray(str: string): boolean {
  // 检查字符串是否包含 '{' 和 '}'
  if (!(str.includes('{') && str.includes('}')))
    return false

  try {
  // 尝试将字符串转化为对象
    const obj = JSON.parse(str)
    // 检查 obj 是否是数组
    if (Array.isArray(obj)) {
      // 如果是数组，返回 false
      return false
    }
    else {
      // 如果不是数组，返回 true
      return true
    }
  }
  catch (error) {
    // 如果转化失败，返回 false
    return false
  }
}
