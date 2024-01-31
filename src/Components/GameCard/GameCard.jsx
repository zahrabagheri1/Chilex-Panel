import React, { useState } from 'react';
import './GameCard.scss';
import yatzy from '../../Assets/image/yatzy.png';
import backgammon from '../../Assets/image/backgammon.png';
import ludo from '../../Assets/image/ludo.png';
import uno from '../../Assets/image/uno.png';
import soccer from '../../Assets/image/soccer.png';
import Switch from '../Switch/Switch';
import { BiDotsVertical } from "react-icons/bi";
import moment from 'moment-jalaali';

// const props = {
//   id: 1,
//   name: "backgammon",
//   activity: false,
//   creaty: "2023-11-09T07:30:08.506Z",
//   updated: "2023-11-09T07:30:08.506Z"
// }

function GameCard(props) {
  const [activity, setActivity] = useState(props.data.active)
  const [popUp, setPopUP] = useState()

  const gameImgs = {
    backgammon: backgammon,
    soccer: soccer,
    uno: uno,
    ludo: ludo,
    yatzy: yatzy
  }

  const changeActivity = (value) => {
    setActivity(value)
    props.diactivefun(value)
  }

  const showGameDetail = () => {
    if (activity === true) {
      setPopUP(!popUp)
    }
  }

  const openPlayed = () => {
    props.palyedhandler(props.data.name)
  }
  const openSetting = () => {
    props.settinghandler(props.data.name)
  }
  return (
    <div className={'gameCard'} id={props.data.id}>
      <div className="cardimgZoom">
        <img className='cardimg' src={gameImgs[props.data.name]} alt={props.data.name} />
      </div>

      <div className="carddetails">
        <div className='titleAndMenuGame'>
          <div className="imgname">{props.data.name}</div>
          <BiDotsVertical className='imgIcon' onClick={showGameDetail} />
          {
            popUp ?
              <div className="menuGame">
                <div className="menuGameBody">
                  <div className="menuGameSetting" onClick={() => openSetting()}>Settings</div>
                  <div className="menuGameLine"></div>
                  <div className="menuGamePlayed" onClick={() => openPlayed()}>Played</div>
                </div>
              </div>
              : ''
          }
        </div>

        <div className="activeGameBox">
          <div className="activeGameTitle">activity:</div>
          <Switch disabledDiv={true} disabled={false} defaultChecked={props.data.active} onChange={changeActivity} />
        </div>

        <div className="createdATUpdatedAT">
          <div className="createdAtGame">
            <div className="createdAtGameTitle">createdAt:</div>
            <div className='createdAtGameText'>{moment(props.data.createdAt, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
          </div>
          <div className='createdATUpdatedATLine'></div>
          <div className="updatedAtGame">
            <div className="updatedAtGameTitle">updatedAt:</div>
            <div className='updatedAtGameText'>{moment(props.data.updatedAt, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
