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
      focused: false,
      error: null,
      isLoaded: false,
      formData : {
        name: "",
        date: null
      },
      items: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
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

  onDateChange(dateSelected) {
    const formData = {...this.state.formData, date: dateSelected};
    this.setState({
      formData
    })
  }

  handleChange(event) {
    const formData = {...this.state.formData, name: event.target.value};
    this.setState({
      formData
    })
  }

  handleSubmit(event) {
    console.log(this.state.formData);
      fetch('/api/new', {
        method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(this.state.formData)
      }).then((res => {
        console.log(res);
        return res.json;
      }))

      event.preventDefault();
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
            <label htmlFor="name" className="app__form__label">Your name</label>
            <input type="text" value={this.state.formData.name} onChange={this.handleChange} />
            <label htmlFor="dob" className="app__form__label">Your date of birth</label>
            <SingleDatePicker 
              date={this.state.formData.date} // momentPropTypes.momentObj or null
              onDateChange={this.onDateChange} // PropTypes.func.isRequired
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
              <li key={item.id}>
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

const encodeFormData = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
}

export default App;