// @flow

export function delay<T> (ms: number): (T => Promise<T>) {
  return function (value) {
    return new Promise(function (resolve) {
      setTimeout(() => resolve(value), ms)
    })
  }
}

export function delayPromise (ms: number): Promise<void> {
  return Promise.resolve().then(delay(ms))
}

export function withMinTime<T> (promise: Promise<T>, ms: number): Promise<T> {
  return Promise.all([promise, delayPromise(ms)]).then(([value]) => value)
}
