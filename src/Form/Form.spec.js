import React from 'react';
import $ from 'teaspoon';

import Form from './Form.jsx';
import TextInput from '../TextInput';

describe('Form component', () => {
  let props;
  let mountedForm;

  const form = () => {
    if (!mountedForm) {
      mountedForm = $(
        <Form {...props} >
        </Form>
      ).render().children().first();
    }

    return mountedForm;
  }

  beforeEach(() => {
    props = {
      onSubmit: jest.fn()
    }
  });

  it('should render a form element', () => {
    const forms = form().find('form');

    expect(forms.length).toBe(1);
  });

  it('should create a model object on component state', () => {
    const formStateModel = form().unwrap()._model;

    expect(formStateModel).toBeDefined();
    expect(formStateModel.isFormValid).toBeTruthy();
  });

  it('should pass onSubmit handler to form element', () => {
    const formElem = form().find('form');

    const onSubmit = formElem.props().onSubmit;

    expect(onSubmit).toBe(form().unwrap()._onSubmit);
  });

  describe('when form is submitted', () => {
    const mockSubmit = jest.fn();


    beforeEach(() => {
      props = {
        onSubmit: mockSubmit
      }

      // Force re render with new props
      mountedForm = null;
    });

    it ('should called onSubmit prop function', () => {
      form().trigger('submit');

      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe('when it has TextInput children', () => {
    const TEXT_INPUT_NAME = 'email';
    let textInput = null;

    beforeEach(() => {
      const formComponent = form().unwrap();

      textInput = $(
        <TextInput name={TEXT_INPUT_NAME} value=""/>
      ).render(false, null, {
        form: {
          attachInputToForm: formComponent._attachInputToForm,
          inputDidChange: formComponent._inputDidChange
        }
      })
      .children()
      .first();
    })

    it('should add the input value to model', () => {
      const formComponent = form().unwrap();

      const expectedFieldObject = {
        name: TEXT_INPUT_NAME,
        value: '',
        isValid: true,
        isPristine: true,
        errors: {}
      }

      expect(formComponent._model.fields[TEXT_INPUT_NAME]).toBeDefined();
      expect(formComponent._model.fields[TEXT_INPUT_NAME]).toEqual(expectedFieldObject);
      expect(formComponent._inputs[TEXT_INPUT_NAME]).toBeDefined();
    });

    describe('when a child TextInput changes', () => {
      it('should update TextInput model value', () => {
        const formComponent = form().unwrap();
        const NEW_VALUE = 'changed';
        textInput.unwrap().state.value = NEW_VALUE;

        formComponent._inputDidChange(textInput.unwrap());

        expect(formComponent._model.fields[TEXT_INPUT_NAME].value).toBe(NEW_VALUE);
      });

      it('should add the field to invalidFields array is TextInput is invalid', () => {
        const formComponent = form().unwrap();
        const expectedFieldObject = {
          value: '',
          isValid: false,
          isPristine: false,
          errors: {required: 'This is field is required'}
        }

        textInput.unwrap().setState(expectedFieldObject);

        formComponent._inputDidChange(textInput.unwrap());
        expectedFieldObject.name = TEXT_INPUT_NAME;

        expect(formComponent._invalidFields[TEXT_INPUT_NAME]).toBeDefined();
        expect(formComponent._invalidFields[TEXT_INPUT_NAME]).toEqual(expectedFieldObject);
      });

      describe('when onChange prop is passed', () => {
        const mockOnChange = jest.fn();

        beforeEach(() => {
          props = {
            onSubmit: jest.fn(),
            onChange: mockOnChange
          }

          mountedForm = null
        });

        it('should call onChange function', () => {
          const formComponent = form().unwrap();
          const isFormValid = true;
          const invalidFields = {};

          textInput.render(false, null, {
            form: {
              attachInputToForm: formComponent._attachInputToForm,
              inputDidChange: formComponent._inputDidChange
            }
          });

          formComponent._inputDidChange(textInput.unwrap());

          expect(mockOnChange).toHaveBeenCalledWith(isFormValid, invalidFields, formComponent._model);
        });
      });
    });

    describe('when validating an input', () => {

      beforeEach(() => {
        const formComponent = form().unwrap();

        textInput = $(
          <TextInput name={TEXT_INPUT_NAME} value="alex@muub.com"
          validators={{email: true}}
        />
        ).render(false, null, {
          form: {
            attachInputToForm: formComponent._attachInputToForm,
            inputDidChange: formComponent._inputDidChange
          }
        })
        .children()
        .first();
      })

      it('should set valid state prop to true with a valid email', () => {
        const formComponent = form().unwrap();

        const input = textInput.unwrap();

        formComponent._validateInput(input);

        expect(input.state.isValid).toBeTruthy();
        expect(input.state.errors.email).not.toBeDefined();
      });

      it('should set valid state prop to false with a invalid email', () => {
        const formComponent = form().unwrap();

        const input = textInput.unwrap()
        input.state.value = '1234';
        input.state.isPristine = false;

        formComponent._validateInput(input);

        expect(input.state.isValid).toBeFalsy();
        expect(input.state.errors.email).toBeDefined();
      });
    });
  });
});
