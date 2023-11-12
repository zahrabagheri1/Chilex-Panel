import React, { useEffect, useState } from 'react';
import GameCard from '../../../../Components/GameCard/GameCard';
import './List.scss';
import axios from 'axios';
function Index() {
  const [games, setGames] = useState()

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


  return (
    <div className='gameList row'>
      {
        games?.map((game , index) => (
          <div key={index} className="col-xl-3 col-lg-4 col-md-4 col-ms-6 col-xs-6">
            <GameCard id={game.id} name={game.name} activity={game.active} creaty={game.createdAt} updated={game.updatedAt} />
          </div>
        ))

      }
    </div>
  );
}

export default Index;