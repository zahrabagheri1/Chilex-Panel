import React, { useEffect, useState } from 'react';
import Dropdown from '../../Components/Dropdown/Dropdown';
import './Table.scss';

function Table(props) {
    const [user, setUser] = useState()
    
    useEffect(() => {
    }, [])

    return (
        <>
            {
                <table className='table'>
                    <thead className='header'>
                        <tr className='trhead'>
                            {Array.isArray(props.sort)? 
                            props.sort.map((name,index)=>(
                                <th className="thhead">
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
                                    <td className='tdbody'>{item[key]=== null ? 'null': item[key]}</td>
                                ))}
                                <td className='tdbody'>{
                                    <Dropdown/>
                                }</td>
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
