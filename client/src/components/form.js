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
          },
          nameError: false,
          dateError: false,
          submitError: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
    }
    
    onDateChange(dateSelected) {
        const formData = {...this.state.formData, date: dateSelected.utc().set({
            hour: "00",
            minute: "00",
            second: "00"
        })};
        this.setState({
            formData
        })
    }

    onNameChange(event) {
        const formData = {...this.state.formData, name: event.target.value};
        this.setState({
            formData
        })
    }

    validateForm() {
        if(this.state.formData.name === "" || this.state.formData.name == null) {
            this.setState({
                nameError: true
            })
        } else {
            this.setState({
                nameError: false
            })
        }

        var now = new Date();
        if(this.state.formData.date == null || this.state.formData.date > now ) {
            this.setState({
                dateError: true
            })
        } else {
            this.setState({
                dateError: false
            }) 
        }

        return (!this.state.nameError && !this.state.dateError);
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.clearSubmitError();

        if(this.validateForm()) {

            try {
            
                await fetch('/api/new', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(this.state.formData)
                });

                await this.props.loadData();
                this.resetForm();  

            } catch {
                this.showSubmitError(); 
                return new Error ("Error saving");
            }
        }
    }  

    showSubmitError() {
        this.setState({
            submitError : true
        }) 
    }

    clearSubmitError() {
        this.setState({
            submitError : false
        }) 
    }

    resetForm() {
        this.setState({
            formData : { 
                name: "",
                date: null
            }
        }) 
    }

    render() {
        return (
            <form action="POST" method="/api/new" className="form">
                <label htmlFor="name" className="app__form__label">Your name*</label>
                <input type="text" value={this.state.formData.name} onChange={this.onNameChange} className="app__form__name"/>
                {this.state.nameError ? <span className="error">Please enter a name</span> : ''}
                <label htmlFor="dob" className="app__form__label">Date of birth*</label>
                <SingleDatePicker 
                    date={this.state.formData.date} // momentPropTypes.momentObj or null
                    onDateChange={this.onDateChange} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="dob" // PropTypes.string.isRequired,
                    isOutsideRange={day => !isInclusivelyBeforeDay(day, moment())}
                    numberOfMonths={1}
                    displayFormat="DD/MM/YYYY"
                />
                {this.state.dateError ? <span className="error">Please select/enter a valid past date</span> : ''}
                <br />
                <button onClick={this.handleSubmit}>Calculate</button>
                {this.state.submitError ? <span className="error">Error submitting, try again later</span> : ''}
          </form>
        )
    }
}

export default Form;