import React, {Component} from 'react';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '1rem'
  },
  toggleAll: {
    width: '30px',
    height: '30px',
    marginRight: '1rem',
    cursor: 'pointer',
    fontSize: '24px',
    color: '#ccc',
    border: 'none',
    background: 'transparent',
    outline: 'none',
    transform: 'rotate(90deg)',
    lineHeight: '1'
  },
  input: {
    flex: 1,
    fontSize: '24px',
    fontWeight: 300,
    padding: '16px 16px 16px 0',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit',
    color: '#333',
    background: 'transparent'
  }
};

export class TodoInput extends Component {
  constructor() {
    super();
    this.state = {
      text: ''
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.trim()) {
      this.props.onAdd(this.state.text);
      this.setState({text: ''});
    }
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSubmit(e);
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={styles.container}>
        {this.props.hasTodos && (
          <button
            type="button"
            onClick={this.props.onToggleAll}
            style={styles.toggleAll}
            title={this.props.allCompleted ? 'Mark all as incomplete' : 'Mark all as complete'}
          >
            ❯
          </button>
        )}
        <input
          type="text"
          style={styles.input}
          placeholder="What needs to be done?"
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
      </form>
    );
  }
}

TodoInput.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  onToggleAll: React.PropTypes.func.isRequired,
  allCompleted: React.PropTypes.bool.isRequired,
  hasTodos: React.PropTypes.bool.isRequired
};

