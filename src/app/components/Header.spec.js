/* eslint "react/no-find-dom-node": "off" */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import {Header} from '../header';

describe('Header', () => {
  it('should display ToDone title', () => {
    const header = TestUtils.renderIntoDocument(<Header/>);
    const headerNode = ReactDOM.findDOMNode(header);
    const titleNode = headerNode.querySelector('p');
    expect(titleNode.textContent).toContain('ToDone');
  });

  it('should be a header element', () => {
    const header = TestUtils.renderIntoDocument(<Header/>);
    const headerNode = ReactDOM.findDOMNode(header);
    expect(headerNode.tagName).toEqual('HEADER');
  });
});

