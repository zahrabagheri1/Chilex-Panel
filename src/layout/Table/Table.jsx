import React, { useState } from 'react';
import './Table.scss';
import moment from 'moment-jalaali';
import ScrollContainer from 'react-indiana-drag-scroll';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

function Table(props) {
    const [activePage, setActivePage] = useState(false)
    const currentPage = parseInt(props.list?.current_page)
    const totlaPage = props.list?.total_pages
    const showDetail = (id) => {
        if (props.showDetailStatus === false) {

        } else {
            props.showDetail(id)
        }
    }

    const pagintionHandler = (page) => {
        props.offsetTable(page + 1)
        // setActivePage(!activePage)
    }

    const previousPagntion = () => {
        if (currentPage === 1) {
            props.offsetTable(currentPage)
        } else {
            props.offsetTable(currentPage - 1)
        }
    }

    const nextPagntion = () => {
        if (currentPage === totlaPage) {
            props.offsetTable(currentPage)
        } else {
            props.offsetTable(currentPage + 1)
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
                    <div className="tableBox">
                        {/* <ScrollContainer> */}
                        <div className='tableBody'>
                            <table className='table'>
                                <thead className='header'>
                                    <tr className='trhead'>
                                        {Array.isArray(props.sort) ?
                                            props.sort.map((name, index) => (
                                                name.status === true ?
                                                    <th className="thhead" key={index} colSpan={name.child ? (name.child.length) : '1'}>
                                                        {name.name}
                                                    </th>
                                                    :
                                                    ""
                                            ))
                                            : null
                                        }

                                    </tr>
                                </thead>
                                <tbody className='tbody'>
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
                                                                    key === 'finished' ?
                                                                        value === true ?
                                                                            <td className="tdbody statusActive" key={index}>Finished</td>
                                                                            :
                                                                            <td className="tdbody statusInactive" key={index}>Not Finished</td>

                                                                        :
                                                                        name.list ?
                                                                            name.list.map((ele, index) => (
                                                                                value === index ?
                                                                                    <td key={index} className='tdbody'>{ele}</td> : null
                                                                            ))
                                                                            :
                                                                            name.date ?
                                                                                <td className="tdbody" key={index}>
                                                                                    {moment(value).format('jYYYY/jM/jD')}</td>
                                                                                :
                                                                                name.data ?
                                                                                    <td className="tdbody" key={index}>{value}</td>

                                                                                    :
                                                                                    name.child ?
                                                                                        name.name === 'prices' ?

                                                                                            <td className='tdbody'>have </td>

                                                                                            :

                                                                                            <td className='tdbody'>have child</td>
                                                                                        :
                                                                                        <td className="tdbody" key={index}>{value}</td>





                                                                // {
                                                                //     name: 'prices', status: true, list: false, date: false,
                                                                //     child: [
                                                                //         { name: 'id', status: false },
                                                                //         { name: 'amount', status: true, list: false, date: false },
                                                                //         { name: 'priceTypes', status: true, list: false, date: false },
                                                                //         { name: 'priceStatus', status: true, list: ['Active', 'Inactive'], date: false }
                                                                //     ]
                                                                // },
                                                                // {
                                                                //     name: 'activityIntervalTime', status: true, list: false, date: false,
                                                                //     child: [
                                                                //         { name: 'day', status: true, list: false, date: false },
                                                                //         { name: 'hour', status: true, list: false, date: false },
                                                                //         { name: 'minute', status: true, list: false, date: false },
                                                                //     ]
                                                                // },

                                                                : null
                                                        ))

                                                    ))
                                                }
                                            </tr>
                                        ))
                                        : null}
                                </tbody>
                            </table>
                        </div>
                        {/* </ScrollContainer> */}

                        {
                            props.list || totlaPage > 1 ?
                                <div className="tablePagintion">
                                    <div className="pagintion">
                                        <div className="previousbtn" onClick={previousPagntion}><HiChevronLeft /></div>
                                        {
                                            [...Array(totlaPage).keys()].map((index) => (
                                                index === currentPage - 1 || index === currentPage  || index === currentPage + 1 || index === currentPage + 2 || index === currentPage + 3 ?
                                                    <div className={`pagenumber ${activePage ? 'active' : ''}`} key={index} onClick={() => pagintionHandler(index)} >{index + 1}</div>
                                                    : null
                                            ))
                                        }
                                        <div className="nextbtn" onClick={nextPagntion}><HiChevronRight /></div>
                                    </div>
                                </div>
                                : null
                        }
                    </div>
            }
        </div>
    );
}

export default Table;

