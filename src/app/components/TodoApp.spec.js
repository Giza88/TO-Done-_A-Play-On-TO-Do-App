import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {TodoApp} from './TodoApp';

describe('TodoApp', () => {
  let originalLocalStorage;

  beforeEach(() => {
    originalLocalStorage = global.localStorage;
    const store = {};
    global.localStorage = {
      getItem: key => store[key] || null,
      setItem: (key, value) => {
        store[key] = String(value);
      },
      removeItem: key => {
        delete store[key];
      },
      clear: () => {
        Object.keys(store).forEach(key => delete store[key]);
      }
    };
  });

  afterEach(() => {
    global.localStorage = originalLocalStorage;
  });

  it('adds a todo item', () => {
    const app = TestUtils.renderIntoDocument(<TodoApp/>);
    app.addTodo('Test item');
    expect(app.state.todos.length).toBe(1);
    expect(app.state.todos[0].text).toBe('Test item');
  });
});
