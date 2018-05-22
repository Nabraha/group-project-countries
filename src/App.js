import React, { Component } from 'react';
import Languages from './components/Languages';
import people from './data/people';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      people: people,
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Community Member Countries</h1>
        </header>
        <Languages />
      </div>
    );
  }
}

export default App;