import React, { Component } from 'react';
import Header from './components/header';
import Form from './components/form';
import Results from './components/results';
import './App.css';

/**
 * Component to render app
 */
class App extends Component {

  /**
   * @inheritdoc
   */
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.loadApi = this.loadApi.bind(this);
  }

  /**
   * @inheritdoc
   */
  async componentDidMount() {
    await this.loadApi();
  }

  /**
   * load all records and store in state
   */
  async loadApi() {
      const data = await fetch('/api/all');
      const items = await data.json();

      if(items) {
        this.setState({
          items
        })
      }
  }

  /**
   * @inheritdoc
   */
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