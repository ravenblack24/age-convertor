import React, { Component } from 'react';

class Results extends Component {

    render () {
        return (
            <section className="results">
                <table className="results__table">
                    <tr>
                        <th>Name</th>
                        <th>Years</th>
                        <th>Days</th>
                        <th>Hours</th>
                    </tr>
                    {this.props.data.reverse().map(item => (
                        <tr>
                        <td>{item.name}</td>
                        <td>{item.years}</td>
                        <td>{item.days}</td>
                        <td>{item.hours}</td>
                        </tr>
                    ))} 
                </table>
            </section>
        )
    }
}

export default Results;