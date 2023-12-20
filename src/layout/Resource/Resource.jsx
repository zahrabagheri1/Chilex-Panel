import React from 'react';
import './Resource.scss';
import ResourceBox from './ResourceBox/ResourceBox';


const settingId = 2
function Resources(props) {

    return (
        props.data === undefined || props.data === null ? '' :
            props.data.map((requirement) => (
                <ResourceBox requirement={requirement} type={props.type} onchange={props.onchange}/>
            ))
    );
}

export default Resources;
