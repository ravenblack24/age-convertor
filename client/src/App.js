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
      focused: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
      
  }  
  render() {
    return (
      <div className="App">
        <form>
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
    );
  }
}

export default App;