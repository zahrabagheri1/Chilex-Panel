import React from 'react';
import './Table.scss';

function Table(props) {
    return (
        <>
            {
                <table className='table'>
                    <thead className='header'>
                        <tr className='trhead'>
                            {Array.isArray(props.sort)? 
                            props.sort.map((name,index)=>(
                                <th className="thhead" key={index}>
                                    {name.name}
                                </th>
                            ))
                            :null}
                        </tr>
                    </thead>
                    <tbody className='bodytable'>
                        {Array.isArray(props.data) ?
                        props.data?.map((item, index)=>(
                            <tr className='trbody'>
                                {Object.entries(item).map(([key,value])=>(
                                    Array.isArray(value) ?
                                    (
                                     console.log(Object.entries(value))  
                                    )
                                    :
                                    <td className='tdbody'>{item[key]=== null ? 'null': item[key]}</td>

                                ))}
                            </tr>
                        ))
                        :null}
                    </tbody>
                </table>
            }
        </>
    );
}

export default Table;
