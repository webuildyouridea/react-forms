import React from 'react';
import $ from 'teaspoon';

import TextInput from './TextInput.jsx';
import Form from '../Form';
import textInputValidators from './TextInputValidators';

describe('TextInput component', () => {
  let props;
  let formComponent;
  let mountedTextInput;

  const textInput = () => {
    if (!mountedTextInput) {
      formComponent = $(<Form onSubmit={jest.fn()}/>)
        .render()
        .children()
        .first()
        .unwrap();

      $.defaultContext({
        form: {
          attachInputToForm: formComponent._attachInputToForm
        }
      });

      mountedTextInput = $(<TextInput {...props} />)
        .render()
        .children()
        .first();
    }

    return mountedTextInput;
  }

  beforeEach(() => {
    props = {
      name: 'email',
      value: ''
    }
  });

  it('should throw error when not used inside Form context', () => {
    expect(() => {
      $(<TextInput {...props} />).render(false, null, {});
    }).toThrow();
  });

  it('should render an input element', () => {
    const input = textInput().find('input');

    expect(input.length).toBe(1);
  });


  describe('when validators object is passed', () => {

    beforeEach(() => {
      props = {
        name: 'email',
        value: '',
        validators: {
          email: true
        }
      }

      mountedTextInput = null;
    });

    it('should add the correct validator to validators array', () => {
      const textInputComponent = textInput().unwrap();

      const validators = textInputComponent.validators;

      expect(validators.length).toBe(1);
      expect(validators[0].name).toBe('email');
      expect(validators[0].error).toBe('Invalid value');
      expect(validators[0].test).toBeInstanceOf(Function);
    });

    it('should add map each validator with its error message', () => {
      props.errorMessage = {email: 'Email is invalid'};
      const textInputComponent = textInput().unwrap();

      const validators = textInputComponent.validators;

      expect(validators.length).toBe(1);
      expect(validators[0].name).toBe('email');
      expect(validators[0].error).toBe('Email is invalid');
      expect(validators[0].test).toBeInstanceOf(Function);
    });
  });

  describe('when required prop is passed', () => {

    beforeEach(() => {
      props = {
        name: 'email',
        value: '',
        validators: {
          email: true
        },
        required: true
      }

      mountedTextInput = null;
    });

    it('should add required validator to validators array', () => {
      const textInputComponent = textInput().unwrap();

      const validators = textInputComponent.validators;

      expect(validators.length).toBe(2);
      expect(validators[1].name).toBe('required');
      expect(validators[1].error).toBe('This field is required');
      expect(validators[1].test).toBeInstanceOf(Function);
    });
  });

  describe('when input changes', () => {

    const NEW_VALUE = 'A';
    const EVENT_OBJECT = {target: {value: NEW_VALUE}}
    let mockInputDidChange;
    let mockValidateInput;

    beforeEach(() => {
      mockInputDidChange = jest.fn();
      mockValidateInput = jest.fn();

      mountedTextInput = $(
        <TextInput {...props}/>
      ).render(false, null, {
        form: {
          attachInputToForm: formComponent._attachInputToForm,
          inputDidChange: mockInputDidChange,
          validateInput: mockValidateInput
        }
      })
      .children()
      .first();
    });

    it('should call context.form.inputDidChange', () => {
      const textInputComponent = textInput();
      textInputComponent.find('input').trigger('change', EVENT_OBJECT);

      expect(mockInputDidChange).toHaveBeenCalled();
    });

    it('should call context.form.validateInput', () => {
      const textInputComponent = textInput();
      textInputComponent.find('input').trigger('change', EVENT_OBJECT);

      expect(mockValidateInput).toHaveBeenCalled();
    });
  });
});
