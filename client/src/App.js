import React, { Component } from 'react';
import Form from './components/form';
import Results from './components/results';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  async componentDidMount() {
    await this.loadApi();
  }

  async loadApi() {
    const data = await fetch('/api/all');
    const items = await data.json();

    if(items) {
      this.setState({
        items,
        isLoaded: true
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <main className="main">
          <Form loadData = {this.loadApi}/>
          <Results data={this.state.items} />
        </main>
      </React.Fragment>
    );
  }
}

export default App;