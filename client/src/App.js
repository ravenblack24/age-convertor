import React, { Component } from 'react';
import Header from './components/header';
import Form from './components/form';
import Results from './components/results';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
          items
        })
      }
  }

  render() {
    return (
      <React.Fragment>
          <Header />
          <section class="main">
            <Form loadData = {this.loadApi}/>
            <Results data={this.state.items} />
          </section>
      </React.Fragment>
    );
  }
}

export default App;