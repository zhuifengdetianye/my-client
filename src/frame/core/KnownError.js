// @flow

import ExtendableError from 'es6-error'

type ErrorOpts = { message: string, code: number };

class KnownError extends ExtendableError {
  opts: ErrorOpts;

  constructor (message: string | ErrorOpts) {
    const opts: ErrorOpts =
      typeof message === 'string' ? { message, code: -1 } : message
    super(opts.message)
    this.opts = opts
  }

  get code (): number {
    return this.opts.code
  }
}

export default KnownError
