// URL
export class REG_EXP_URL {
  // 是否是一个 URL，包含 http(?), ftp
  static isHttpURL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
}
