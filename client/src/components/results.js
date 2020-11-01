import React from 'react';

function Results (props) {

    if(props.data.length === 0) {
        return (
            <React.Fragment></React.Fragment>
        )
    }
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
                {props.data.reverse().map(item => (
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

export default Results;