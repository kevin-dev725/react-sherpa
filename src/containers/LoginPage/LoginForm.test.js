import React from 'react';
import LoginForm from './LoginForm';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('LoginForm', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      submit: jest.fn(),
      formError: ''
    }
    component = mount(
      <LoginForm {...props} />,
    );
  });

  it('tests LoginForm functionality', () => {
    // initial data
    let data = { username: "diego", password: "pass123" };
    let { username, password } = data;

    // submit-button initially disabled
    expect(
      component.find('input[type="submit"]').prop('disabled')
    ).toBeTruthy();

    // change values
    component.find('input[name="username"]')
      .simulate('change', { target: { value: username } });
    component.find('input[name="password"]')
      .simulate('change', { target: { value: password } });

    // test for changed values
    expect(
      component.find('input[name="username"]').prop('value')
    ).toEqual(username);
    expect(
      component.find('input[name="password"]').prop('value')
    ).toEqual(password);

    expect(
      component.find('input[type="submit"]').prop('disabled')
    ).toBeFalsy();

    // test submission
    component.find('form').simulate('submit');
    expect(component.find(LoginForm).prop('submit')).toBeCalled();
  });
});
