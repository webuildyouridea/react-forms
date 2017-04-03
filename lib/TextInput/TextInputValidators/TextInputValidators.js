'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  alphabet: alphabet,
  alphanumeric: alphanumeric,
  minLength: minLength,
  maxLength: maxLength,
  email: email,
  numeric: numeric,
  pattern: pattern
};


function alphabet() {
  return function (value) {
    var regex = /^[a-zA-Z\sáéíóú]+$/;
    return regex.test(value);
  };
}

function alphanumeric() {
  return function (value) {
    var regex = /^[a-zA-Z0-9\sáéíóú]+$/;
    return regex.test(value);
  };
}

function minLength(config) {
  if (typeof config !== 'number') {
    throw new Error('TextInput: "minLength" validator requires a number value as parameter.');
  }

  return function (value) {
    return value.length >= config;
  };
}

function maxLength(config) {
  if (typeof config !== 'number') {
    throw new Error('TextInput: "maxLength" validator requires a number value as parameter');
  }

  return function (value) {
    return value.length <= config;
  };
}

function email() {
  return function (value) {
    var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(com|edu|gov|info|int|name|net|org|pro|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    return regex.test(value);
  };
}

function numeric() {
  return function (value) {
    var regex = /^[0-9]+$/;
    return regex.test(value);
  };
}

function pattern(config) {
  if (config instanceof RegExp) {
    return function (value) {
      return config.test(value);
    };
  }

  throw new Error('TextInput: "patter" validator requires a RegExp object as parameter');
}