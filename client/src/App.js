import React, { Component } from 'react';
import * as moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
      focused: false,
      error: null,
      isLoaded: false,
      items: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  handleSubmit() {
      
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
        <div className="App">
          <form action="POST" method="/api/new">
            <label for="name" className="app__form__label">Your name</label>
            <input
              name="name"
              type="text"
            />
            <label for="dob" className="app__form__label">Your date of birth</label>
            <SingleDatePicker 
              name="dob"
              date={this.state.date} // momentPropTypes.momentObj or null
              onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
              focused={this.state.focused} // PropTypes.bool
              onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
              id="dob" // PropTypes.string.isRequired,
              isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
              numberOfMonths={2}
              displayFormat="DD/MM/YYYY"
            /><br />
            <button onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
        <div>
          <ul>
            {this.state.items.reverse().map(item => (
              <li key={item._id}>
                {item.name} {item.years} {item.days} {item.hours}
              </li>
            ))} 
            </ul>
        </div>
        </React.Fragment>
      );
    }
  }
}

export default App;