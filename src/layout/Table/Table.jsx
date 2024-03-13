import React from 'react';
import './Table.scss';
import moment from 'moment-jalaali';
import ScrollContainer from 'react-indiana-drag-scroll';
import SelectOption from '../../Components/SelectOption/SelectOption';
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

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
                    <div className="tableBox">
                        <ScrollContainer>
                            <div className='tableBody'>
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
                                                                                            <td className='tdbody'>have child</td>
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
                            </div>
                        </ScrollContainer>


                        <div className="tablePagintion">
                            <div className="pagintion">
                                <div className="previousbtn"><HiChevronLeft /></div>
                                <div className="pagenumber">1</div>
                                <div className="pagenumber">2</div>
                                <div className="pagenumber">4</div>
                                <div className="pagenumber">5</div>
                                <div className="pagenumber">6</div>
                                <div className="pagenumber">7</div>
                                <div className="nextbtn"><HiChevronRight /></div>
                            </div>
                        </div>

                    </div>
            }
        </div>
    );
}

export default Table;

