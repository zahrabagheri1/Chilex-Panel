import React from 'react';
import './SettingsCard.scss';
import Input from '../Input/Input';

const props = {
    id: '1',
    name: '2p (bronze)',
    active: true,
    game: 'ludo',
    playersLength: 2,
    type: 'quick',
    description: 'description',
    level: 1,
    botLevel: 2,
    createdAt: '2023-11-16T09:07:02.831Z',
    updatedAt: '2023-11-16T09:07:02.831Z'
}

// name	string
// active	boolean
// game	string
// playersLength	number
// description	string
// botLevel	number

function SettingsCard() {
    return (
        <div className='settingCard'>
            <div className="">
                <div className='settingStatus'>
                    <div className="settingdiactive"></div>
                </div>
                <div className='settingName'>{props.game}</div>
                {
                    Object.entries(props).map(([key, value], index) => (

                        <div className='settingDetail'>
                            <div className="cupName">{props.name}</div>
                            <Input name={'name'} title={'name'} type={props.name === 'amount' ? 'number' : 'text'} />

                        </div>

                    ))
                }
            </div>
        </div>

    );
}

export default SettingsCard;
