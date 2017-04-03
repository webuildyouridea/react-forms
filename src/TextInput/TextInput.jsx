// @flow

import React, {PropTypes} from 'react';
import textInputValidators from './TextInputValidators';
import injectSheet from 'react-jss';
import styles from './TextInput.style.js';

import type {TextInputValidatorName} from './TextInputValidators';

export type TextInputProps = {
  name: string,
  type?: string,
  value: string,
  validators?: {[key: TextInputValidatorName]: any} | (value: string) => boolean,
  errorMessage?: {[key: TextInputValidatorName]: string} | string,
  required?: boolean,
  onChange?: (e: SyntheticInputEvent) => void,
  hideErrors: boolean
}

type TextInputState = {
  value: string,
  isValid: boolean,
  isPristine: boolean,
  errors: ?Object,
  shouldHideErrors: boolean
}

type Validator = {
  name: string,
  error: string,
  test: (value: string) => boolean
}

class TextInput extends React.Component {
  props: TextInputProps
  state: TextInputState

  validators: Array<Validator> = []

  static defaultProps = {
    value: '',
    errorMessage: 'Invalid value'
  }

  constructor(props: TextInputProps) {
    super(props);

    this.state = {
      value: props.value || '',
      isValid: true,
      isPristine: true,
      errors: {},
      shouldHideErrors: props.hideErrors || false
    }

    this._setValidators(props.validators)
  }

  componentWillMount() {
    if (!this.context.form) {
      throw new Error('TextInput: component should be inside a react-forms Form component');
    }

    this.context.form.attachInputToForm(this);
  }

  _setValidators(validators: any) {
    let error = this.props.errorMessage;

    if (typeof validators === 'function') {

      if (typeof error !== 'string') {
        console.warn('TextInput: "errorMessage" prop should be string when validator is a custom function');
        error = 'Invalid value';
      }
      return this.validators.push({name: 'default' ,error, test: validators});
    }

    for(let validator:string in validators) {
      let errorMessage = typeof error === 'string' ? error : error[validator];

      this.validators.push({
        name: validator,
        error: errorMessage,
        test: textInputValidators[validator](validators[validator])})
    }
  }

  _onChange = (e: SyntheticInputEvent) => {
    const {target: {value}} = e;
    const {inputDidChange, validateInput} = this.context.form;

    this.setState({
      value,
      isPristine: false
    }, () => {
      validateInput(this);
      inputDidChange(this);
    });

    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  render() {
    const {name,
      type,
      value,
      onChange,
      validators,
      errorMessage,
      hideErrors,
      classes,
      sheet, // dont include props added by react-jss
      ...otherProps
    } = this.props;
    const {errors, shouldHideErrors} = this.state;

    const errorsKeys = errors ? Object.keys(errors) : [];

    return (
      <div className={classes.muub__inputContainer}>
        <input name={name}
          type={type || 'text'}
          className={classes.muub__input}
          value={this.state.value}
          onChange={this._onChange}
          {...otherProps}
        />
        {
          !shouldHideErrors && errorsKeys.length > 0 && errorsKeys.map((key, index) => {
            return (
              <span key={index}>
                {errors ? errors[key] : null}
              </span>
            )
          })
        }
      </div>
    )
  }
}


TextInput.contextTypes = {
  form: PropTypes.shape({
    attachInputToForm: PropTypes.func
  })
}

export default injectSheet(styles)(TextInput);
