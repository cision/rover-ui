import React from 'react';
import { shallow } from 'enzyme';

import ExpansionPanel from '../ExpansionPanel';
import Accordion from './';

describe('Accordion', () => {
  it('renders its children', () => {
    const wrapper = shallow(
      <Accordion>
        <ExpansionPanel>
          <ExpansionPanel.Header />
        </ExpansionPanel>
      </Accordion>
    );

    expect(wrapper.children()).toHaveLength(1);
  });

  it('can be fully styled', () => {
    const wrapper = shallow(
      <Accordion className="foo" style={{ bar: 'bar' }} />
    );

    expect(wrapper.hasClass('foo')).toEqual(true);
    expect(wrapper.props().style).toEqual({ bar: 'bar' });
  });

  it('every panel will be collapsed by default', () => {
    const wrapper = shallow(
      <Accordion>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 1</ExpansionPanel.Body>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 2</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 2</ExpansionPanel.Body>
        </ExpansionPanel>
      </Accordion>
    );
    wrapper.children().forEach((panel) => {
      expect(panel.prop('expanded')).toBe(false);
    });
  });

  it('`expanded` prop passed to panels should be overrided', () => {
    const wrapper = shallow(
      <Accordion>
        <ExpansionPanel expanded>
          <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 1</ExpansionPanel.Body>
        </ExpansionPanel>
        <ExpansionPanel expanded>
          <ExpansionPanel.Header>Header 2</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 2</ExpansionPanel.Body>
        </ExpansionPanel>
      </Accordion>
    );
    wrapper.children().forEach((panel) => {
      expect(panel.prop('expanded')).toBe(false);
    });
  });

  it('defaultExpanded` should set a panel a `expanded`', () => {
    const wrapper = shallow(
      <Accordion defaultExpandedPanel={1}>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 00</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body </ExpansionPanel.Body>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 1</ExpansionPanel.Body>
        </ExpansionPanel>
      </Accordion>
    );
    wrapper.children().forEach((panel, index) => {
      expect(panel.prop('expanded')).toBe(index === 1);
    });
  });

  it('should keep only an expanded panel at the same time', () => {
    const togglePanelAndValidate = (wrapper, panelIndex, validateFn) => {
      wrapper.childAt(panelIndex).shallow().childAt(0).simulate('click');
      wrapper.children().forEach((panel, index) => {
        expect(panel.prop('expanded')).toBe(validateFn(index));
      });
    };

    const wrapper = shallow(
      <Accordion>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 0</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 0</ExpansionPanel.Body>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanel.Header>Header 1</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body 1</ExpansionPanel.Body>
        </ExpansionPanel>
      </Accordion>
    );

    togglePanelAndValidate(wrapper, 0, (index) => index === 0);
    togglePanelAndValidate(wrapper, 1, (index) => index === 1);
    togglePanelAndValidate(wrapper, 1, () => false);
  });

  it('should call `onToggle` function when expansion component clicked', () => {
    const handleToggle = jest.fn();

    const wrapper = shallow(
      <Accordion>
        <ExpansionPanel onToggle={handleToggle}>
          <ExpansionPanel.Header>Header</ExpansionPanel.Header>
          <ExpansionPanel.Body>Body</ExpansionPanel.Body>
        </ExpansionPanel>
      </Accordion>
    );

    wrapper.childAt(0).shallow().childAt(0).simulate('click', {});
    expect(handleToggle).toHaveBeenCalledWith({}, true);
  });
});
