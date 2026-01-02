import React from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px',
    borderTop: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#777'
  },
  count: {
    flex: '0 0 auto'
  },
  filters: {
    display: 'flex',
    flex: '1',
    justifyContent: 'center'
  },
  filterButtonSpacer: {
    margin: '0 4px'
  },
  filterButton: {
    padding: '4px 8px',
    border: '1px solid transparent',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#777',
    outline: 'none',
    borderRadius: '3px',
    fontFamily: 'inherit'
  },
  filterButtonActive: {
    borderColor: '#efd5d5',
    fontWeight: 'bold'
  },
  clearButton: {
    flex: '0 0 auto',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#777',
    outline: 'none',
    padding: '4px 8px',
    fontFamily: 'inherit'
  }
};

export function TodoFilters({filter, onFilterChange, activeCount, completedCount, onClearCompleted}) {
  const getCountText = () => {
    if (activeCount === 1) {
      return '1 item left';
    }
    return `${activeCount} items left`;
  };

  return (
    <div style={styles.container}>
      <span style={styles.count}>{getCountText()}</span>
      <div style={styles.filters}>
        <button
          type="button"
          style={filter === 'all' ? Object.assign({}, styles.filterButton, styles.filterButtonActive) : styles.filterButton}
          onClick={() => onFilterChange('all')}
        >
          All
        </button>
        <span style={styles.filterButtonSpacer}></span>
        <button
          type="button"
          style={filter === 'active' ? Object.assign({}, styles.filterButton, styles.filterButtonActive) : styles.filterButton}
          onClick={() => onFilterChange('active')}
        >
          Active
        </button>
        <span style={styles.filterButtonSpacer}></span>
        <button
          type="button"
          style={filter === 'completed' ? Object.assign({}, styles.filterButton, styles.filterButtonActive) : styles.filterButton}
          onClick={() => onFilterChange('completed')}
        >
          Completed
        </button>
      </div>
      {completedCount > 0 && (
        <button
          type="button"
          style={styles.clearButton}
          onClick={onClearCompleted}
        >
          Clear completed
        </button>
      )}
    </div>
  );
}

TodoFilters.propTypes = {
  filter: React.PropTypes.string.isRequired,
  onFilterChange: React.PropTypes.func.isRequired,
  activeCount: React.PropTypes.number.isRequired,
  completedCount: React.PropTypes.number.isRequired,
  onClearCompleted: React.PropTypes.func.isRequired
};

