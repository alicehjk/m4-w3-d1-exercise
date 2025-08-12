import React from 'react';
import { shallow } from 'enzyme';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.exists()).toBe(true);
  });

  it('matches snapshot', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('creates state entry on change', () => {
    const wrapper = shallow(<MyComponent />);
    const input = wrapper.find('input');
    input.props().onChange({ target: { name: 'input', value: 'myValue' } });
    expect(wrapper.state('input')).toBeDefined();
  });

  it('stores the event value into state', () => {
    const wrapper = shallow(<MyComponent />);
    const input = wrapper.find('input');
    input.props().onChange({ target: { name: 'input', value: 'myValue' } });
    expect(wrapper.state('input')).toEqual('myValue');
  });
});
