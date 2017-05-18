// @flow

import React, {PropTypes} from 'react';
import injectSheet from 'react-jss';
import TextInput from '../TextInput';

import type {Field, Fields, FormModel, FieldError} from './_types';

type FormProps = {
  onChange?: (isFormValid: boolean, invalidFields: Fields, model: FormModel) => void,
  onSubmit: (model: FormModel) => void,
  forceErrorOn?: Array<FieldError>,
  children: any,
  className: string,

  //JSS
  classes: Object
}

type FormInputs = {
  [key: string]: TextInput
}

const style = {
  muub_form: {
    position: 'relative',
    maxWidth: '100%'
  }
}

class Form extends React.Component {
  props: FormProps

  _model:FormModel = {
    isFormValid: true,
    fields: {}
  }
  _inputs: FormInputs = {}
  _invalidFields: Fields = {}

  constructor(props: FormProps) {
    super(props);
  }

  getChildContext() {
    return {
      form: {
        attachInputToForm: this._attachInputToForm,
        inputDidChange: this._inputDidChange,
        validateInput: this._validateInput
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.forceErrorOn) return;
    if (nextProps.forceErrorOn.length < 1) return;

    for(let error of nextProps.forceErrorOn) {
      const fieldName = Object.keys(error)[0];

      const fieldComponent = this._inputs[fieldName];
      fieldComponent.setState({
        isValid: false,
        errors: {forced: error[fieldName]}
      });
    }
  }

  _attachInputToForm = (textInput: TextInput) => {
    this._inputs[textInput.props.name] = textInput;
    this._model.fields[textInput.props.name] = this._getFieldObjectFromInput(textInput);
  }

  _inputDidChange = (textInput: TextInput) => {
    const {name} = textInput.props;
    const fieldObject = this._getFieldObjectFromInput(textInput);

    this._model.fields[name] = fieldObject;

    if (!textInput.state.isValid) {
      this._invalidFields[name] = fieldObject;
    }
    else {
      delete this._invalidFields[name];
    }

    const isFormValid = this._validateForm();

    if (!this.props.onChange) return;

    this.props.onChange(isFormValid, this._invalidFields, this._model);
  }

  _validateForm() {
    let isFormValid = Object.keys(this._invalidFields).length < 1;

    this._model.isFormValid = isFormValid;

    return isFormValid;
  }

  _validateInput = (textInput: TextInput) => {
    const {validators} = textInput;
    let isValid = true;

    textInput.state.errors = {};

    for (let validator of validators) {
      const {isPristine} = textInput.state;
      const {value} = textInput.props;

      if (!validator.test(value)) {
        // We don't want to add validator errors if user has not typed anything.
        // Only display required errors.
        if (isPristine && validator.name !== 'required') continue;

        isValid = false;
        textInput.state.errors[validator.name] = validator.error;
      }
    }

    textInput.setState({isValid});
    return isValid;
  }

  _validateRequiredFields = () => {

    for (let field in this._inputs) {
      const input:TextInput = this._inputs[field];
      if (input.props.required) {
        const isValid = this._validateInput(input);

        if (!isValid) {
          this._invalidFields[field] = this._getFieldObjectFromInput(input);
        }
        else {
          delete this._invalidFields[input];
        }

        input.setState({
          isValid
        });
      }
    }

    return this._validateForm();
  }

  _getFieldObjectFromInput(textInput: TextInput) {
    const {name} = textInput.props;
    const {value, isValid, isPristine, errors = null} = textInput.state;

    return {
      name,
      value,
      isValid,
      isPristine,
      errors
    }
  }

  _onSubmit = (e: SyntheticInputEvent) => {
    e.preventDefault();
    const {onSubmit} = this.props;

    this._validateRequiredFields();

    onSubmit(this._model);
  }

  render() {
    const {className = '', classes: {muub_form}} = this.props;

    return (
      <form className={`${muub_form} ${className}`}
        onSubmit={this._onSubmit} noValidate>
        {this.props.children}
      </form>
    )
  }
}

Form.childContextTypes = {
  form: PropTypes.shape({
    attachInputToForm: PropTypes.func,
    inputDidChange: PropTypes.func,
    validateInput: PropTypes.func
  })
}

export default injectSheet(style)(Form);
