// @flow

export type Vars = {
  [string]: any
};

export type VarsState = {
  +vars: Vars
}

export type VarsAction = { type: "SET_VARS", key: string, value: mixed };
