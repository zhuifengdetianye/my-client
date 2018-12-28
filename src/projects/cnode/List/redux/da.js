// @flow

import formPopup from 'frame/ui/popup/form'
import * as apiClient from 'projects/cnode/lib/apiClient'
import qs from 'qs'

// 抽象出来的公告部分
const popupConfigBasic = [
  {
    key: 'title',
    title: '页面名称',
    required: true
  },
  {
    key: 'projectId',
    title: '项目编号'
  }
]

function getRandomStr (len?: number): string {
  return Math.random()
    .toString(36)
    .substr(2, len)
}

export function searchItems (): Promise<void> {
  const search = window.location.search
  const condition = search ? qs.parse(search.substr(1)) : {}

  return apiClient
    .get('/special/search', condition)
    .then((list: any) => {

    })
    .catch(console.log)
}

export function addItem (itemInfo) {
  const { platform } = itemInfo
  formPopup({
    title: '创建新页面',
    fields: [
      {
        key: 'code',
        title: '页面编号',
        required: true,
        placeholder: '只能包含数字、字母或者下划线',
        regex: /^\w+$/,
        regexError: '只能包含数字、字母或者下划线'
      },
      ...popupConfigBasic
    ],
    defaultValues: {
      code: getRandomStr(5),
      projectId: getRandomStr()
    },
    validator ({
      code,
      title,
      projectId
    }) {
      return apiClient.postJson('/special/add', {
        code,
        title,
        projectId
      })
        .then(specialInfo => {
          console.log(specialInfo)
        })
        .catch(e => {
          return {
            code: e.message
          }
        })
    }
  })
  .catch(e => {
    if (e.message !== 'cancel') {
      console.log(e)
    }
  })
}
