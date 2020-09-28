import React from 'react';
import { mount, shallow } from 'enzyme';

import TabMenu, { EasyTabMenu } from '.';

describe('TabMenu', () => {
  it('renders', () => {
    shallow(<TabMenu>Boom</TabMenu>);
  });

  it('Renders correctly', () => {
    const wrapper = shallow(
      <TabMenu className="customClass">
        <div>item</div>
        <div>item</div>
      </TabMenu>
    );

    expect(wrapper.find('ul').children()).toHaveLength(2);
    expect(wrapper.hasClass('customClass')).toEqual(true);
  });
});

describe('TabMenu.Item', () => {
  it('is not active by default', () => {
    const inactive = mount(<TabMenu.Item>I am inactive :(</TabMenu.Item>);

    expect(inactive.prop('active')).not.toBe(true);
  });

  it('triggers onClick handler when clicking', () => {
    const fakeClickHandler = jest.fn();
    const menuItem = mount(
      <TabMenu.Item onClick={fakeClickHandler}>
        Clickable menu item
      </TabMenu.Item>
    );
    menuItem.simulate('click');

    expect(fakeClickHandler).toHaveBeenCalled();
  });
});

describe('EasyTabMenu', () => {
  it('has the same number of children as array items', () => {
    const wrapper = shallow(
      <EasyTabMenu
        tabs={[
          { key: 'one', label: 'first', onClick: () => {} },
          { key: 'two', label: 'second', onClick: () => {} },
        ]}
      />
    );
    expect(wrapper.children()).toHaveLength(2);
  });
});
