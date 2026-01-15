import React from 'react';
import TestUtils from 'react-addons-test-utils';

import {TodoItem} from './TodoItem';

describe('TodoItem', () => {
  it('toggles and deletes the item', () => {
    const todo = {id: 1, text: 'A task', completed: false};
    const onToggle = jasmine.createSpy('onToggle');
    const onDelete = jasmine.createSpy('onDelete');
    const onEdit = jasmine.createSpy('onEdit');

    const item = TestUtils.renderIntoDocument(
      <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit}/>
    );

    const checkbox = TestUtils.scryRenderedDOMComponentsWithTag(item, 'input')[0];
    TestUtils.Simulate.change(checkbox);
    expect(onToggle).toHaveBeenCalledWith(1);

    const deleteButton = TestUtils.scryRenderedDOMComponentsWithTag(item, 'button')[0];
    TestUtils.Simulate.click(deleteButton);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
