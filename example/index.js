import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Field, Label, TextInput, TextArea, Dropdown} from '../src';

class Example extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    bio: '',
    password: '',
    gender: '',
    formForcedErrors: []
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

  inputDidChange = (propName, event) => {
    this.setState({[propName]: event.target.value});

    if (this.state.formForcedErrors.length > 0) {
      this.setState({formForcedErrors: []})
    }
  }

  genderDidChange = event => {
    this.setState({gender: event.target.value});
  }

  forceError = (e) => {
    e.preventDefault();
    this.setState({formForcedErrors: [{email: 'Email is already taken'}]});
  }

  render() {

    return (
      <div>
        <h1>REACT FORMS EXAMPLE</h1>
        <Form onSubmit={this.formDidSubmit}
          onChange={this.formDidChange}
          forceErrorOn={this.state.formForcedErrors}>
          <Field>
            <Label>Email:</Label>
            <TextInput name="email"
              type="email"
              value={this.state.email}
              validators={{email: true}}
              errorMessage={{email: 'Email is invalid'}}
              required
              onChange={this.inputDidChange.bind(null, 'email')}></TextInput>
          </Field>
          <Field>
            <Label>Bio:</Label>
            <TextArea name="bio"
              value={this.state.bio}
              validators={{maxLength: 140}}
              errorMessage={{maxLength: 'The limit is 140 characters'}}
              onChange={this.inputDidChange.bind(null, 'bio')}
            />
          </Field>
          <Field>
            <Label>Gender:</Label>
            <Dropdown name="gender"
            value={this.state.gender}
            placeholder="I am..."
            onChange={this.genderDidChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Dropdown>
          </Field>
          <Field>
            <Label>Password:</Label>
            <TextInput name="password"
              type="password"
              value={this.state.password}
              validators={{minLength: 6}}
              errorMessage={{minLength: 'Minimun length is 6'}}
              required
              onChange={this.inputDidChange.bind(null, 'password')}
            />
          </Field>
          <button onClick={this.forceError}>Force Error on Email</button>
          <br/>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
}

ReactDOM.render(<Example />, document.getElementById('app'));
