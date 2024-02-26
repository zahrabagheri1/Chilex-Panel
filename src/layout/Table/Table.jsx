import React from 'react';
import './Table.scss';
import moment from 'moment-jalaali';

function Table(props) {

    const showDetail = (id) => {
        if (props.showDetailStatus === false) {

        } else {
            props.showDetail(id)
        }
    }


    return (
        <div className='showData'>
            {
                (props.data === null || props.data === undefined || props.data.length === 0) ?
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
                                            <th className="thhead" key={index} colSpan={name.child ? name.child.length : '1'}>
                                                {name.name}</th>
                                            :
                                            ""
                                    ))
                                    : null
                                }

                            </tr>
                        </thead>
                        <tbody className='bodytable'>
                            {Array.isArray(props.data) ?
                                props.data?.map((item, index) => (
                                    <tr className='trbody' key={index} onClick={() => showDetail(item.id)} >
                                        {
                                            Object.entries(item).map(([key, value]) => (
                                                props.sort.map((name, index) => (
                                                    name.name === key ?
                                                        value === null ?
                                                            key === 'ban' ?
                                                                <td className="tdbody" key={index}>Not ban</td>
                                                                :
                                                                <td className="tdbody" key={index}>null</td>
                                                            :
                                                            name.list ?
                                                                name.list.map((ele, index) => (
                                                                    // value === index ?
                                                                        // <td key={index} className='tdbody'>{ele}</td> : null
                                                                    <td className="tdbody" key={index}>{value}</td>
                                                                ))
                                                                :
                                                                name.date ?
                                                                    moment(value).format('jYYYY/jM/jD')
                                                                    :
                                                                    <td className="tdbody" key={index}>{value}</td>
                                                        : null
                                                ))

                                            ))
                                        }
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

