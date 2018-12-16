// @flow

function formatDate (
  time: Date | number | string,
  formatRule?: string = 'YYYY-MM-DD HH:mm'
): string {
  let date = new Date(time)
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'D+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor(date.getMonth() / 3) + 1, //季度
    S: date.getMilliseconds() // 毫秒
  }

  let week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六'
  }
  if (/(Y+)/.test(formatRule)) {
    formatRule = formatRule.replace(
      // $FlowFixMe
      RegExp.$1,
      // $FlowFixMe
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  if (/(E+)/.test(formatRule)) {
    formatRule = formatRule.replace(
      // $FlowFixMe
      RegExp.$1,
      // $FlowFixMe
      (RegExp.$1.length > 1
        // $FlowFixMe
        ? RegExp.$1.length > 2 ? '星期' : '\u5468'
        : '') + week[date.getDay() + '']
    )
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(formatRule)) {
      formatRule = formatRule.replace(
        // $FlowFixMe
        RegExp.$1,
        // $FlowFixMe
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return formatRule
}

export { formatDate }
