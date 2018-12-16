// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

import type { VarsState, VarsAction } from './vars'
import type { UiPopupState, UiPopupAction } from "./uiPopup"
import type { MapState, MapAction } from "./map";

export type ReduxInitAction = { type: "@@INIT" };

export type State = VarsState & UiPopupState & MapState;

export type Action =
  | ReduxInitAction
  | VarsAction
  | UiPopupAction
  | MapAction
  | Function;

export type Dispatch = ReduxDispatch<Action>;

export type Store = ReduxStore<State, Action, Dispatch>;
