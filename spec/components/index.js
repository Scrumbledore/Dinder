import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Menu from '../../app/components/Menu'


import jsdom from 'jsdom'
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.document = doc
global.window = doc.defaultView

// test('Visit component', (assert) => {

//   const testVisit = () => {
//     console.log('just visiting...')
//   }

//   const component = shallow(<Visit />)
//   const wrapper = mount(<Visit visited={testVisit} />)

//   assert.equal(
//     component.find('span').text(), '', 'the visit component has no text'
//   )

//   assert.pass(
//     expect(component.find('span').text(), '')
//   )

//   assert.equal(
//     wrapper.props().visited, testVisit, 'the visit component has a visited prop'
//   )

//   assert.end()
// });
describe('<menu />', (assert) => {

  it('calls componentDidMount', () => {
    const component = shallow(<Menu />);
    const wrapper = mount(<Menu />);
    expect(Menu.prototype.componentDidMount.calledOnce).to.equal(true);
  });

});