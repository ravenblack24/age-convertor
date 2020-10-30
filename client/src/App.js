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

  componentDidMount() {
    this.loadApi();
  }

  loadApi() {
    fetch('/api/all')
      .then(res => res.json())
      .then((result) => {
         this.setState({
          isLoaded: true,
          items: result
      });
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    })
  }

  render() {
    const { error, isLoaded} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
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
}

export default App;