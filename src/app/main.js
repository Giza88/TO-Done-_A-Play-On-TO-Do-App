import React, {Component} from 'react';
import {Header} from './header';
import {TodoApp} from './components/TodoApp';
import {Footer} from './footer';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5'
  }
};

export class Main extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Header/>
        <main style={styles.main}>
          <TodoApp/>
        </main>
        <Footer/>
      </div>
    );
  }
}

