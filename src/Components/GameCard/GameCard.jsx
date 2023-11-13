import React, { useState } from 'react';
import './GameCard.scss';
import yatzy from '../../Assets/image/yatzy.png';
import backgammon from '../../Assets/image/backgammon.png';
import ludo from '../../Assets/image/ludo.png';
import uno from '../../Assets/image/uno.png';
import soccer from '../../Assets/image/soccer.png';
import Switch from '../Switch/Switch';
import { useNavigate } from 'react-router-dom';

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
  }

  
  const showGameDetail = (e) => {
    props.showGame(e.target.name)
  }

  return (
    <div className={`gameCard ${activity === true ? '' : 'diactivity'}`}>
      <div className={`dot ${activity === true ? 'activity' : ''}`}></div>
      <div className="cardimgZoom">
        <img className='cardimg' src={gameImgs[props.name]} name={props.name}  alt={props.name}  onClick={showGameDetail}/>
      </div>

      {/* <img className='cardimg' src={ludo} alt={props.name} /> */}

      <div className="carddetails">
        <div className="imgname">
          {props.name}
        </div>

        <div className="subimgtext">
          <div className="subimgtextItem">
            <div className="subtitelimg">activity:</div>
            {/* <div className='subtext'>{props.activity === true ? 'active' : 'diactive'}</div> */}
            <div className='subtext'>
              <Switch disabledDiv={true} defaultChecked={props.activity} onChange={changeActivity} />
            </div>
          </div>
          <div className="subimgtextItem">
            <div className="subtitelimg">createdAt:</div>
            <div className='subtext'>{props.creaty}</div>
          </div>

          <div className="subimgtextItem">
            <div className="subtitelimg">updatedAt:</div>
            <div className='subtext'>{props.updated}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
