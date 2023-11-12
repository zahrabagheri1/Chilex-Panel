import React from 'react';
import './GameCard.scss';
import yatzy from '../../Assets/image/yatzy.png';
import backgammon from '../../Assets/image/backgammon.png';
import ludo from '../../Assets/image/ludo.png';
import uno from '../../Assets/image/uno.png';
import soccer from '../../Assets/image/soccer.png';


const props = {
  id: 1,
  name: "backgammon",
  activity: false,
  creaty: "2023-11-09T07:30:08.506Z",
  updated: "2023-11-09T07:30:08.506Z"
}

function GameCard(props) {

  const gameImgs = {
    backgammon: backgammon,
    soccer: soccer,
    uno: uno,
    ludo: ludo,
    yatzy: yatzy
  }

  return (
    <div className='gameCard'>
      <div className={`dot ${props.activity === true ? 'activity' : ''}`}></div>
      <div className="cardimgZoom">

        <img className='cardimg' src={gameImgs[props.name]} alt={props.name} />
      </div>

      {/* <img className='cardimg' src={ludo} alt={props.name} /> */}


      <div className="carddetails">
        <div className="imgname">
          {props.name}
        </div>

        <div className="subimgtext">
          <div className="subimgtextItem">
            <div className="subtitelimg">activity:</div>
            <div className='subtext'>{props.activity === true ? 'active' : 'diactive'}</div>
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
