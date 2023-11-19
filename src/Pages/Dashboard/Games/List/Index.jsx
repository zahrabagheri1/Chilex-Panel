import React, { useEffect, useRef, useState } from 'react';
import GameCard from '../../../../Components/GameCard/GameCard';
import './List.scss';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from '../../../../Components/Button/Button';


function Index() {
  const [games, setGames] = useState()
  const [modal, setModal] = useState(false)
  const [name, setName] = useState()
  const [active, setActive] = useState()
  const navigate = useNavigate();
  const [id] = useSearchParams()
  useEffect(() => {
    gameIAP();
  }, [])

  const gameIAP = () => {
    axios.get('/games')
      .then(
        res => {
          setGames(res.data.data)
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  }

  const showGameItems = (name) => {
    setName(name)
    setModal(true)
  }

  const diactiveCard = (value) => {
    setActive(value)
  }

  const gameSetting = () => {
    console.log('settings URL',id)
    navigate('/settings')
  }

  const gamePlayed = () => {

  }

  const mouseOut = ()=>{
    setModal(false)
  }

  return (
    <div className='gameList row'>
      {
        games?.map((game, index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-4 col-ms-6 col-xs-6">
            <GameCard id={game.id} name={game.name} activity={game.active}
              creaty={game.createdAt} updated={game.updatedAt}
              showGame={showGameItems} diactivefun={diactiveCard} />
          </div>
        ))
      }
      <div className={`modalGame ${modal ? 'active': ''}`} onClick={mouseOut}>
        <div className="modalGameBox">
          <div className="modalGameTitle">{name}</div>
          <div className="btnGameBox">
            <Button title='Settings' className='settingTitle' classnameBtn='settingBtn' handler={gameSetting} />
            <Button title='Played' className='playedTitle' classnameBtn='playedBtn' handler={gamePlayed} />
          </div>
        </div>
      </div>


    </div>
  );
}

export default Index;

