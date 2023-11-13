import React, { useEffect, useState } from 'react';
import GameCard from '../../../../Components/GameCard/GameCard';
import './List.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Index() {
  const [games, setGames] = useState()
  const navigate = useNavigate();

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
    console.log(name)
    navigate(`settings/${name}`)
  }

  const diactiveCard = () => {

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
    </div>
  );
}

export default Index;