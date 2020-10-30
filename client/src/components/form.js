import React, {Component} from 'react';
import * as moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
          focused: false,
          formData : {
            name: "",
            date: null
          }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

    async handleSubmit(event) {
        console.log(this.state.formData);
        
        await fetch('/api/new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.formData)
        });

        await this.props.loadData();
        this.setState({
            formData : { 
                name: "",
                date: null
            }
        })  
        event.preventDefault();
    }  

    render() {
        return (
            <form action="POST" method="/api/new" className="form">
                <label htmlFor="name" className="app__form__label">your name</label>
                <input type="text" value={this.state.formData.name} onChange={this.handleChange} className="app__form__name"/>
                <label htmlFor="dob" className="app__form__label">date of birth</label>
                <SingleDatePicker 
                    date={this.state.formData.date} // momentPropTypes.momentObj or null
                    onDateChange={this.onDateChange} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="dob" // PropTypes.string.isRequired,
                    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                    numberOfMonths={2}
                    displayFormat="DD/MM/YYYY"
                />
                <br />
                <button onClick={this.handleSubmit}>Calculate</button>
          </form>
        )
    }
}

export default Form;