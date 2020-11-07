import React, {Component} from 'react';
import * as moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker, isInclusivelyBeforeDay} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

/**
 * Component to render form
 */
class Form extends Component {

    /**
     * @inheritdoc
     */
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
    
    /**
     * Change handler for SingleDatePicker
     * 
     * @param {Moment} dateSelected the date chosen in the SingleDatePicker
     */
    onDateChange(dateSelected) {
        
        let date;
        
        if(dateSelected) {
            date = dateSelected.utc().set({
            hour: "00",
            minute: "00",
            second: "00"
        })};

        const formData = {...this.state.formData, date}
        this.setState({
            formData
        })
    }

    /**
     * Change handler for input field
     * 
     * @param {Event} event the input field change event
     */
    onNameChange(event) {
        const formData = {...this.state.formData, name: event.target.value};
        this.setState({
            formData
        })
    }

    /**
     * Validates form inputs to ensure valid input and date values
     */
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

        // @todo change to moment()
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

    /**
     * Process the form when submit button is pressed
     * 
     * @param {Event} event the form submit event
     * 
     * @throws {Error}
     */
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

    /**
     * Set submit error state
     */
    showSubmitError() {
        this.setState({
            submitError : true
        }) 
    }

    /**
     * Clear submit error state
     */
    clearSubmitError() {
        this.setState({
            submitError : false
        }) 
    }

    /**
     * Reset form inputs to default
     */
    resetForm() {
        this.setState({
            formData : { 
                name: "",
                date: null
            }
        }) 
    }

    /**
     * @inheritdoc
     */
    render() {
        return (
            <form action="POST" method="/api/new" className="form">
                <label htmlFor="name" className="app__form__label">Your name*</label>
                <input type="text" value={this.state.formData.name} onChange={this.onNameChange} className="app__form__name"/>
                {this.state.nameError ? <span className="error">Please enter a name</span> : ''}
                <label htmlFor="dob" className="app__form__label">Date of birth*</label>
                <SingleDatePicker 
                    date={this.state.formData.date} 
                    onDateChange={this.onDateChange} 
                    focused={this.state.focused} 
                    onFocusChange={({ focused }) => this.setState({ focused })} 
                    id="dob"
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