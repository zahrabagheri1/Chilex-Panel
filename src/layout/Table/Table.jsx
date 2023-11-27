import React from 'react';
import './Table.scss';

function Table(props) {

    const showDetail = (id) => {
        props.showDetail(id)
    }

    return (
        <div className='showData'>
            {
                props.data === null || props.data === undefined ?
                <div className='emptyTable'>
                WE DON'T HAVE ANY DATA!
                </div>
                :
                <table className='table'>
                    <thead className='header'>
                        <tr className='trhead'>
                            {Array.isArray(props.sort) ?
                                props.sort.map((name, index) => (
                                    name.status === true ?
                                        <th className="thhead" key={index} colSpan={name.child ? name.child.length : '1'}>{name.name}</th>
                                        :
                                        ""
                                ))
                                : null}
                        </tr>
                    </thead>
                    <tbody className='bodytable'>
                        {Array.isArray(props.data) ?
                            props.data?.map((item, index) => (
                                <tr className='trbody' key={index} onClick={() => showDetail(item.id)} >
                                    {Object.entries(item).map(([key, value]) => (
                                        Array.isArray(value) ?
                                            (item[key].map((thing, key) =>
                                                Object.entries(thing).map(([thingKey, thingValue], key) =>
                                                    <td key={key}>{thing[thingKey]}</td>
                                                )))
                                            :
                                            <td className='tdbody'>{item[key] === null ? 'null' : item[key]}</td>
                                    ))}
                                    <td className='tdbody'>
                                        {/* <DropDown/> */}
                                    </td>
                                </tr>
                            ))
                            : null}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default Table;
