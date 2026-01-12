import React from 'react';
import {TodoItem} from './TodoItem';

const styles = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  }
};

export function TodoList({todos, onToggle, onDelete, onEdit}) {
  return (
    <ul style={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: React.PropTypes.array.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};


