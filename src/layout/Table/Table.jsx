import React from 'react';
import './Table.scss';
import moment from "moment-jalaali";
import format from "moment-jalaali";

function Table(props) {

    const showDetail = (id) => {
        props.showDetail(id)
    }

    // console.log(props.data)

    const types = ['Gem bundle', 'Coin bundle', 'Item', 'Free'];
    const tiers = ['DEFAULT', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY'];
    const gatewayTypes = ['PASARGAD', 'CAFE_BAZAAR', 'EXCHANGE'];
    const referenceTypes = ['DEFAULT', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY'];

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
                                        {Object.entries(item).map(([key, value]) => (
                                            (Array.isArray(value)) ?
                                                (item[key].map((price) =>
                                                    Object.entries(price).map(([priceKey, priceValue], index) =>

                                                        priceKey === 'priceStatus' ?
                                                            priceValue === 0 ?
                                                                <td key={index} className='tdbody'>Active</td>
                                                                :
                                                                <td key={index} className='tdbody'>Inactive</td>
                                                            :
                                                            priceKey === 'priceType' ?
                                                                <td key={index} className='tdbody'>
                                                                    {priceValue === 0 ?
                                                                        'Gem'
                                                                        : priceValue === 1 ?
                                                                            'Coin'
                                                                            : priceValue === 2 ?
                                                                                'Toman'
                                                                                : 'Free'
                                                                    }
                                                                </td>
                                                                :
                                                                priceKey === 'amount' ?
                                                                    <td className='tdbody'>{priceValue + ' Amt'}</td>
                                                                    :
                                                                    <td className='tdbody' key={index}>{price[priceKey]}</td>
                                                    )))
                                                : typeof value === 'object' && value !== undefined && value !== null ?
                                                    Object.entries(value).map(([timeKey, timeValue], key) => (
                                                        timeKey === 'day' ?
                                                            <td className='tdbody' key={index}>  {timeValue + 'd '}</td>
                                                            : timeKey === 'hour' ?
                                                                <td className='tdbody' key={index}> {timeValue + 'h '}</td>
                                                                : timeKey === 'minute' ?
                                                                    <td className='tdbody' key={index}>{timeValue + 'min '}  </td>
                                                                    : null
                                                    ))
                                                    :
                                                    key === 'createdAt' || key === 'updatedAt' ?
                                                        <td className='tdbody'>{moment(item[key], 'YYYY/MM/DD').format('jYYYY/jM/jD')}</td>
                                                        :
                                                        key === 'status' ?
                                                            item[key] === null ?
                                                                null
                                                                :
                                                                item[key] === 0 ?
                                                                    <td className="tdbody statusActive">Active</td>
                                                                    :
                                                                    <td className="tdbody statusInactive">Inactive</td>
                                                            :
                                                            key === 'type' ?
                                                                types.map(type => (
                                                                    value === types.indexOf(type) ?
                                                                        <td className='tdbody'>{type}</td>
                                                                        :
                                                                        null
                                                                ))
                                                                :
                                                                key === 'referenceType' ?
                                                                    referenceTypes.map(referenceType => (
                                                                        value === referenceTypes.indexOf(referenceType) ?
                                                                            <td>{referenceType}</td> : null
                                                                    ))
                                                                    :
                                                                    key === 'gatewayType' ?
                                                                        gatewayTypes.map(gatewayType => (
                                                                            value === gatewayTypes.indexOf(gatewayType) ?
                                                                                <td>{gatewayType}</td> : null
                                                                        ))
                                                                        : key === 'tier' ?
                                                                            tiers.map(tier => (
                                                                                value === tiers.indexOf(tier) ?
                                                                                    <td className='tdbody'>{tier}</td> : null
                                                                            ))
                                                                            :
                                                                            item[key] === null ?
                                                                                key === 'activityIntervalTime' ?
                                                                                    <td class="tdbody" colspan="3">null</td>
                                                                                    :
                                                                                    <td class="tdbody" colspan="1">null</td>
                                                                                :
                                                                                <td class="tdbody">{item[key]}</td>
                                        ))}
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

