import React, {Component} from 'react';

const styles = {
  item: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '24px',
    position: 'relative',
    transition: 'background-color 0.2s'
  },
  itemCompleted: {
    color: '#d9d9d9',
    textDecoration: 'line-through'
  },
  checkbox: {
    width: '30px',
    height: '30px',
    marginRight: '12px',
    cursor: 'pointer',
    appearance: 'none',
    border: '2px solid #ddd',
    borderRadius: '50%',
    outline: 'none',
    position: 'relative',
    flexShrink: 0
  },
  checkboxChecked: {
    borderColor: '#5dc2af',
    background: '#5dc2af'
  },
  text: {
    flex: 1,
    fontWeight: 300,
    wordBreak: 'break-word',
    paddingRight: '40px'
  },
  deleteButton: {
    position: 'absolute',
    right: '12px',
    fontSize: '24px',
    color: '#cc9a9a',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0,
    transition: 'opacity 0.2s',
    outline: 'none',
    padding: '0',
    width: '30px',
    height: '30px',
    lineHeight: '1'
  },
  deleteButtonVisible: {
    opacity: 1
  },
  editInput: {
    flex: 1,
    fontSize: '24px',
    fontWeight: 300,
    padding: '8px',
    border: '2px solid #5dc2af',
    outline: 'none',
    fontFamily: 'inherit',
    marginRight: '40px'
  }
};

export class TodoItem extends Component {
  constructor() {
    super();
    this.state = {
      isEditing: false,
      editText: '',
      isHovered: false
    };
  }

  handleDoubleClick() {
    this.setState({
      isEditing: true,
      editText: this.props.todo.text
    });
  }

  handleEditChange(e) {
    this.setState({editText: e.target.value});
  }

  handleEditSubmit() {
    const text = this.state.editText.trim();
    if (text && text !== this.props.todo.text) {
      this.props.onEdit(this.props.todo.id, text);
    } else if (!text) {
      this.props.onDelete(this.props.todo.id);
    }
    this.setState({isEditing: false});
  }

  handleEditKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleEditSubmit();
    } else if (e.key === 'Escape') {
      this.setState({isEditing: false});
    }
  }

  handleBlur() {
    this.handleEditSubmit();
  }

  handleMouseEnter() {
    this.setState({isHovered: true});
  }

  handleMouseLeave() {
    this.setState({isHovered: false});
  }

  render() {
    const {todo, onToggle, onDelete} = this.props;
    const itemStyle = Object.assign({}, styles.item, todo.completed ? styles.itemCompleted : {}, this.state.isHovered ? {backgroundColor: '#f9f9f9'} : {});
    const checkboxStyle = Object.assign({}, styles.checkbox, todo.completed ? styles.checkboxChecked : {});
    const deleteButtonStyle = Object.assign({}, styles.deleteButton, this.state.isHovered ? styles.deleteButtonVisible : {});

    if (this.state.isEditing) {
      return (
        <li style={itemStyle}>
          <input
            type="text"
            style={styles.editInput}
            value={this.state.editText}
            onChange={this.handleEditChange.bind(this)}
            onKeyDown={this.handleEditKeyDown.bind(this)}
            onBlur={this.handleBlur.bind(this)}
            autoFocus
          />
        </li>
      );
    }

    return (
      <li
        style={itemStyle}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          style={checkboxStyle}
        />
        <span
          style={styles.text}
          onDoubleClick={this.handleDoubleClick.bind(this)}
        >
          {todo.text}
        </span>
        <button
          type="button"
          onClick={() => onDelete(todo.id)}
          style={deleteButtonStyle}
          title="Delete"
        >
          ×
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
