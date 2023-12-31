import React from 'react';
import './Table.scss';
import moment from "moment-jalaali";
import format from "moment-jalaali";

function Table(props) {

    const showDetail = (id) => {
        if (props.showDetailStatus === false) {

        } else {
            props.showDetail(id)
        }
    }

    const types = ['Gem bundle', 'Coin bundle', 'Item', 'Free'];
    const tiers = ['DEFAULT', 'COMMON', 'RARE', 'EPIC', 'LEGENDARY'];
    const gatewayTypes = ['PASARGAD', 'CAFE_BAZAAR', 'EXCHANGE'];
    const referenceTypes = ['BUNDLE','ITEM' ,'TRANSACTION','SETTING',];

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
                                        {Object.entries(item).map(([key, value], index) => (
                                            (Array.isArray(value)) && key === 'prices' ?
                                                (item[key].map((price, key) =>
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
                                                    Object.entries(value).map(([timeKey, timeValue], index) => (
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
                                                        <td className='tdbody' key={index}>{moment(item[key], 'YYYY/MM/DD').format('jYYYY/jM/jD')}</td>
                                                        :
                                                        key === 'status' ?
                                                            item[key] === null ?
                                                                null
                                                                :
                                                                item[key] === 0 ?
                                                                    <td className="tdbody statusActive" key={index}>Active</td>
                                                                    :
                                                                    <td className="tdbody statusInactive" key={index}>Inactive</td>
                                                            :
                                                            key === 'type' ?
                                                                types.map((type, index) => (
                                                                    value === types.indexOf(type) ?
                                                                        <td className='tdbody' key={index}>{type}</td>
                                                                        :
                                                                        null
                                                                ))
                                                                :
                                                                key === 'referenceType' ?
                                                                    referenceTypes.map((referenceType, index) => (
                                                                        value === referenceTypes.indexOf(referenceType) ?
                                                                            <td key={index}>{referenceType}</td> : null
                                                                    ))
                                                                    :
                                                                    key === 'gatewayType' ?
                                                                        gatewayTypes.map((gatewayType, index) => (
                                                                            value === gatewayTypes.indexOf(gatewayType) ?
                                                                                <td key={index}>{gatewayType}</td> : null
                                                                        ))
                                                                        : key === 'tier' ?
                                                                            tiers.map((tier, index) => (
                                                                                value === tiers.indexOf(tier) ?
                                                                                    <td key={index} className='tdbody'>{tier}</td> : null
                                                                            ))
                                                                            :
                                                                            item[key] === null ?
                                                                                key === 'activityIntervalTime' ?
                                                                                    <td key={index} className="tdbody" colSpan="3">null</td>
                                                                                    :
                                                                                    <td key={index} className="tdbody" colSpan="1">null</td>
                                                                                :
                                                                                key === 'finished' ?
                                                                                    item[key] === true ?
                                                                                        <td key={index} className="tdbody statusActive">Finished</td>
                                                                                        :
                                                                                        <td key={index} className="tdbody statusInactive">Not finished</td>
                                                                                    :
                                                                                    <td key={index} className="tdbody">{item[key]}</td>
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

