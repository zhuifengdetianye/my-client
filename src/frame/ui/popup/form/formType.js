// @flow

type BaseField = {
  key: string,
  title: string,
  visible?: (values: { [string]: any }) => boolean
};

export type BooleanField = BaseField & {
  type: 'boolean'
};

export type CheckboxesField = BaseField & {
  type: 'checkboxes',
  items: Array<{ name: string, value: string }>,
};

export type SelectField = BaseField & {
  type: 'select',
  options: Array<{ value:string, text:string } | string>,
  required?: boolean
};

export type JsonField = BaseField & {
  type: 'jsonEditor'
};

export type FileField = BaseField & {
  type: 'file'
}

export type InputField = BaseField & {
  type?: 'text' | 'password' | 'date' | 'datetime',
  required?: boolean,
  placeholder?: string,
  readOnly?: boolean,
  regex?: RegExp,
  regexError?: string
}

type Field =
  | InputField
  | SelectField
  | CheckboxesField
  | BooleanField
  | JsonField
  // eslint-disable-next-line
  | ArrayField
  | FileField
  | ColorField;

export type Fields = Array<Field>;

export type ArrayField = BaseField & {
  type: 'array',
  item: Fields
};

export type FieldValues = { [string]: string };
export type FieldErrors = { [string]: string };

export function isRegex (field: Field): boolean {
  return (
    !field.type ||
    field.type === 'text' ||
    field.type === 'password' ||
    field.type === 'date' ||
    field.type === 'datetime'
  )
}

export function isRequired (field: Field): boolean {
  return (
    field.type !== 'checkboxes' &&
    field.type !== 'boolean' &&
    field.type !== 'jsonEditor'
  )
}
