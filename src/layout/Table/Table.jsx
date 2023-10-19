import React from 'react';

function Table(props) {
    return (
        <div>
            {props.data === null ? '' :
                <table>
                    <thead>
                        <tr>{Object.keys(props.data[0]).map((item) => (
                            <th>{item}</th>
                        ))}</tr>
                    </thead>
                    <tbody>
                        {props.data.map((user, index) => (
                            <tr key={index} >
                                {Array.isArray(user) ?
                                    user.map((item, index) => (
                                        <td key={index}>{item}</td>
                                    ))

                                    : Object.values(user).map((item, index) => (
                                        <td key={index}>{item}</td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Table;
