// @flow

export type UiPopup = {
  +popupType: 'alert' | 'confirm' | 'loading' | 'toast' | 'wxShare' | null,
  +title?: string,
  +dangerousHtml?: string,
  +message?: string,
  +isModal?: boolean,
  +ok?: string,
  +cancel?: string,
  +onOk?: () => void,
  +onCancel?: () => void
};

export type UiPopupState = {
  +uiPopup: UiPopup
}

export type UiPopupAction =
  | ({ type: 'UI_POPUP' } & UiPopup)
  | { type: 'UI_POPUP_CLOSE' };
