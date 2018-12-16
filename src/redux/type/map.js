// @flow

export type MapType = any;
export type MapState = {
  +map: MapType
};

export type MapAction =
  | { type: 'SET_MAP', keyPath: Array<string | number>, value: mixed }
  | { type: 'MERGE_MAP', keyPath: Array<string | number>, value: mixed }
  | { type: 'DELETE_MAP', keyPath: Array<string | number> }
  | {
      type: 'UPDATE_MAP',
      keyPath: Array<string | number>,
      notSetValue: any,
      updater: (value: any) => any
    }
