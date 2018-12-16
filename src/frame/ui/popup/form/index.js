// @flow

import type { FormProps, FieldValues } from './FormPopup'

import FormPopup, { FORM_POPUP_KEY} from './FormPopup'
import { dispatch } from 'redux/store'
import { setMap, deleteMap} from 'redux/action'

export default function (formProps: FormProps): Promise<FieldValues> {
  return new Promise((resolve, reject) => {
    dispatch(
      setMap(FORM_POPUP_KEY, {
        formProps,
        onCancel: () => {
          dispatch(deleteMap(FORM_POPUP_KEY))
          reject(new Error('cancel'))
        },
        onOk: (formValues: FieldValues) => {
          dispatch(deleteMap(FORM_POPUP_KEY))
          resolve(formValues)
        }
      })
    )
  })
}

export { FormPopup }
