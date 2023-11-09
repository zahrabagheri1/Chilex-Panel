import React from 'react';
import './GameCard.scss';
import {yatzy} from '../../Assets/image/yatzy.png';
import {backgammon} from '../../Assets/image/backgammon.png';
import {ludo} from '../../Assets/image/ludo.png';
import {uno} from '../../Assets/image/uno.png';
import {soccer} from '../../Assets/image/soccer.png';


function GameCard(props) {
  return (
    <div className='gameCard'>
      <div className="img">
        <img src={props.imgSrc} alt={props.imgalt} />
      </div>
      <div className="">
        {props.name}
      </div>
      <div className="">
     
      </div>
      <div className="">
   
      </div>
      
    </div>
  );
}

export default GameCard;


// {
//   "id": 1,
//   "name": "ludo",
//   "active": true,
//   "createdAt": "2023-11-09T07:30:08.506Z",
//   "updatedAt": "2023-11-09T07:30:08.506Z"
// },
// {
//   "id": 2,
//   "name": "backgammon",
//   "active": true,
//   "createdAt": "2023-11-09T07:30:08.523Z",
//   "updatedAt": "2023-11-09T07:30:08.523Z"
// },
// {
//   "id": 3,
//   "name": "uno",
//   "active": true,
//   "createdAt": "2023-11-09T07:30:08.535Z",
//   "updatedAt": "2023-11-09T07:30:08.535Z"
// },
// {
//   "id": 4,
//   "name": "yatzy",
//   "active": true,
//   "createdAt": "2023-11-09T07:30:08.547Z",
//   "updatedAt": "2023-11-09T07:30:08.547Z"
// },
// {
//   "id": 5,
//   "name": "soccer",
//   "active": true,
//   "createdAt": "2023-11-09T07:30:08.556Z",
//   "updatedAt": "2023-11-09T07:30:08.556Z"
// }