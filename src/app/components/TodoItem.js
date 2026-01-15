import React, {Component} from 'react';

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    borderBottom: '1px solid #e0e0e0'
  },
  checkbox: {
    marginRight: '12px',
    width: '18px',
    height: '18px'
  },
  text: {
    flex: 1,
    fontSize: '18px',
    color: '#333',
    wordBreak: 'break-word'
  },
  completedText: {
    textDecoration: 'line-through',
    color: '#999'
  },
  editInput: {
    flex: 1,
    fontSize: '18px',
    padding: '6px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  deleteButton: {
    marginLeft: '8px',
    background: 'none',
    border: 'none',
    color: '#d00',
    cursor: 'pointer',
    fontSize: '16px'
  }
};

export class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editText: props.todo.text
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.todo.text !== this.props.todo.text && !this.state.isEditing) {
      this.setState({editText: nextProps.todo.text});
    }
  }

  startEdit() {
    this.setState({isEditing: true, editText: this.props.todo.text});
  }

  finishEdit() {
    this.setState({isEditing: false});
    this.props.onEdit(this.props.todo.id, this.state.editText);
  }

  cancelEdit() {
    this.setState({isEditing: false, editText: this.props.todo.text});
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.finishEdit();
    } else if (e.key === 'Escape') {
      this.cancelEdit();
    }
  }

  render() {
    const {todo, onToggle, onDelete} = this.props;
    const textStyle = todo.completed
      ? Object.assign({}, styles.text, styles.completedText)
      : styles.text;

    return (
      <li style={styles.item}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={styles.checkbox}
        />
        {this.state.isEditing ? (
          <input
            type="text"
            style={styles.editInput}
            value={this.state.editText}
            onChange={e => this.setState({editText: e.target.value})}
            onKeyDown={this.handleKeyDown.bind(this)}
            onBlur={this.finishEdit.bind(this)}
            autoFocus
          />
        ) : (
          <span style={textStyle} onDoubleClick={this.startEdit.bind(this)}>
            {todo.text}
          </span>
        )}
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          style={styles.deleteButton}
          title="Delete"
        >
          x
        </button>
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};
