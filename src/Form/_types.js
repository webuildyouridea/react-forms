// @flow

export type FormModel = {
  isFormValid: boolean,
  fields: Fields
}

export type Fields = {
  [key: string]: Field
}

export interface Field {
  name: string,
  value: string,
  isValid: boolean,
  errors: ?string
}

export type FieldError = {
  fieldName: string,
  errorMessage: string
};
