import React, { useState } from 'react';
import './GameCard.scss';
import yatzy from '../../Assets/image/yatzy.png';
import backgammon from '../../Assets/image/backgammon.png';
import ludo from '../../Assets/image/ludo.png';
import uno from '../../Assets/image/uno.png';
import soccer from '../../Assets/image/soccer.png';
import Switch from '../Switch/Switch';
import { BiDotsVertical } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'
import moment from 'moment-jalaali';

const props = {
  id: 1,
  name: "backgammon",
  activity: false,
  creaty: "2023-11-09T07:30:08.506Z",
  updated: "2023-11-09T07:30:08.506Z"
}

function GameCard(props) {
  const [activity, setActivity] = useState(props.activity)

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
    console.log(props.name)
    if (activity === true) {
      props.showGame(props.name)
    }
  }

  return (
    <div className={'gameCard'}>
      <div className="cardimgZoom">
        <img className='cardimg' src={gameImgs[props.name]} alt={props.name} />
      </div>

      <div className="carddetails">
        <div className='titleAndMenuGame'>
          <div className="imgname">{props.name}</div>
          <BiDotsVertical className='imgIcon' onClick={showGameDetail}/>

          <div className="menuGame">
            <div className="menuGameSetting"></div>
            <div className="menuGameLine"></div>
            <div className="menuGamePlayed"></div>
          </div>
        </div>

        <div className="activeGameBox">
          <div className="activeGameTitle">activity:</div>
          <Switch disabledDiv={true} defaultChecked={props.activity} onChange={changeActivity} />
        </div>

        <div className="createdATUpdatedAT">
          <div className="createdAtGame">
            <div className="createdAtGameTitle">createdAt:</div>
            <div className='createdAtGameText'>{moment(props.creaty, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
          </div>
          <div className='createdATUpdatedATLine'></div>
          <div className="updatedAtGame">
            <div className="updatedAtGameTitle">updatedAt:</div>
            <div className='updatedAtGameText'>{moment(props.updated, 'YYYY/MM/DD').format('jYYYY/jM/jD')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
