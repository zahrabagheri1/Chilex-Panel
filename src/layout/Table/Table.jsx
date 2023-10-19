import React, { useEffect, useState } from 'react';
import './Table.scss';


function Table({ data }) {

    useEffect(() => {

    }, [])

    return (
        <>
            <table className='table'>
                <thead className='header'>
                    {data?.map((user, index) => (
                        <tr key={index}>
                            { user === undefined || user === null ? '':
                                Object.keys(user[0]).map((key, index) => (
                                    <th key={index}>{key}</th>
                                ))
                            }
                        </tr>
                    ))}

                </thead>
                <tbody className='bodytable'>
                    {data?.map((user, index) => (
                        <tr key={index}>
                            {
                                Object.values(user).map((value, index) => (
                                    <td key={index}>{value}</td>
                                ))
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Table;
