// @flow

export type TextInputValidatorName =
  'alphabet' |
  'alphanumeric' |
  'minLength' |
  'maxLength' |
  'email' |
  'numeric' |
  'pattern';

export default {
  alphabet,
  alphanumeric,
  minLength,
  maxLength,
  email,
  numeric,
  pattern
}

function alphabet() {
  return (value: string): boolean => {
    const regex = /^[a-zA-Z\sáéíóú]+$/;
    return regex.test(value);
  };
}

function alphanumeric() {
  return (value: string): boolean => {
    const regex = /^[a-zA-Z0-9\sáéíóú]+$/;
    return regex.test(value);
  };
}

function minLength(config: number) {
  if (typeof config !== 'number') {
    throw new Error('TextInput: "minLength" validator requires a number value as parameter.');
  }

  return (value: string): boolean => value.length >= config;
}

function maxLength(config: number) {
  if (typeof config !== 'number') {
    throw new Error('TextInput: "maxLength" validator requires a number value as parameter');
  }

  return (value: string): boolean => value.length <= config;
}

function email() {
  return (value: string): boolean => {
    const regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(com|edu|gov|info|int|name|net|org|pro|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return regex.test(value);
  };
}

function numeric() {
  return (value: string): boolean => {
    const regex = /^[0-9]+$/;
    return regex.test(value);
  };
}

function pattern(config: RegExp) {
  if (config instanceof RegExp) {
    return (value: string): boolean => config.test(value);
  }

  throw new Error('TextInput: "patter" validator requires a RegExp object as parameter')
}
