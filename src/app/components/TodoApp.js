import React, {Component} from 'react';
import {TodoInput} from './TodoInput';
import {TodoList} from './TodoList';
import {TodoFilters} from './TodoFilters';

const STORAGE_KEY = 'todonetodos';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginTop: '2rem',
    marginBottom: '2rem'
  },
  title: {
    fontSize: '3rem',
    fontWeight: 300,
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#333'
  }
};

export class TodoApp extends Component {
  constructor() {
    super();
    this.state = {
      todos: this.loadTodos(),
      filter: 'all' // 'all', 'active', 'completed'
    };
  }

  loadTodos() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  saveTodos(todos) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (e) {
      // Ignore storage failures (private mode, quota, disabled storage)
    }
  }

  addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    const newTodo = {
      id: Date.now(),
      text: trimmed,
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.setState(prevState => {
      const todos = prevState.todos.concat([newTodo]);
      return {todos};
    }, () => this.saveTodos(this.state.todos));
  }

  toggleTodo(id) {
    this.setState(prevState => {
      const todos = prevState.todos.map(todo =>
        todo.id === id ? Object.assign({}, todo, {completed: !todo.completed}) : todo
      );
      return {todos};
    }, () => this.saveTodos(this.state.todos));
  }

  deleteTodo(id) {
    this.setState(prevState => {
      const todos = prevState.todos.filter(todo => todo.id !== id);
      return {todos};
    }, () => this.saveTodos(this.state.todos));
  }

  editTodo(id, newText) {
    if (!newText.trim()) {
      this.deleteTodo(id);
      return;
    }
    const trimmed = newText.trim();
    this.setState(prevState => {
      const todos = prevState.todos.map(todo =>
        todo.id === id ? Object.assign({}, todo, {text: trimmed}) : todo
      );
      return {todos};
    }, () => this.saveTodos(this.state.todos));
  }

  toggleAll() {
    this.setState(prevState => {
      const allCompleted = prevState.todos.every(todo => todo.completed);
      const todos = prevState.todos.map(todo => Object.assign({}, todo, {completed: !allCompleted}));
      return {todos};
    }, () => this.saveTodos(this.state.todos));
  }

  clearCompleted() {
    this.setState(prevState => {
      const todos = prevState.todos.filter(todo => !todo.completed);
      return {todos};
    }, () => this.saveTodos(this.state.todos));
  }

  setFilter(filter) {
    this.setState({filter});
  }

  getFilteredTodos() {
    switch (this.state.filter) {
      case 'active':
        return this.state.todos.filter(todo => !todo.completed);
      case 'completed':
        return this.state.todos.filter(todo => todo.completed);
      default:
        return this.state.todos;
    }
  }

  render() {
    const filteredTodos = this.getFilteredTodos();
    const activeCount = this.state.todos.filter(todo => !todo.completed).length;
    const completedCount = this.state.todos.filter(todo => todo.completed).length;
    const allCompleted = this.state.todos.length > 0 && this.state.todos.every(todo => todo.completed);

    return (
      <div style={styles.container}>
        <h1 style={styles.title}>ToDone</h1>
        <TodoInput
          onAdd={this.addTodo.bind(this)}
          onToggleAll={this.toggleAll.bind(this)}
          allCompleted={allCompleted}
          hasTodos={this.state.todos.length > 0}
        />
        {this.state.todos.length > 0 && (
          <div>
            <TodoList
              todos={filteredTodos}
              onToggle={this.toggleTodo.bind(this)}
              onDelete={this.deleteTodo.bind(this)}
              onEdit={this.editTodo.bind(this)}
            />
            <TodoFilters
              filter={this.state.filter}
              onFilterChange={this.setFilter.bind(this)}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={this.clearCompleted.bind(this)}
            />
          </div>
        )}
      </div>
    );
  }
}

