import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Field, Label, TextInput} from '../src';

class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: ''
  }

  formDidSubmit = (model) => {
    console.log(model);
  }

  formDidChange = (isFormValid, invalidFields, model) => {
    console.log('FormDidChange isValid: %s', isFormValid);
    console.log('FormDidChange invalidFields:');
    console.log(invalidFields);
    console.log('FormDidChange model:');
    console.log(model);
  }

  emailInputDidChange = (event) => {
    console.log('InputDidChange value: %s', event.target.value);
  }

  render() {
    return (
      <div>
        <h1>REACT FORMS EXAMPLE</h1>
        <Form onSubmit={this.formDidSubmit}
          onChange={this.formDidChange}>
          <Field>
            <Label>Email:</Label>
            <TextInput name="email"
              type="email"
              value={this.state.email}
              validators={{email: true}}
              errorMessage={{email: 'Email is invalid'}}
              required
              onChange={this.emailInputDidChange}></TextInput>
          </Field>
          <Field>
            <Label>Password:</Label>
            <TextInput name="password"
              type="password"
              value={this.state.password}
              validators={{minLength: 6}}
              errorMessage={{minLength: 'Minimun length is 6'}}
              required
            />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('app'));
