import React, { Component } from 'react';

class Results extends Component {

    render () {
        return (
            <section className="results">
                <table className="results__table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Years</th>
                        <th>Days</th>
                        <th>Hours</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.data.reverse().map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.years}</td>
                            <td>{item.days}</td>
                            <td>{item.hours}</td>
                        </tr>
                    ))} 
                    </tbody>
                </table>
            </section>
        )
    }
}

export default Results;