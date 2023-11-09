import React, { useEffect, useState } from 'react';
import GameCard from '../../../../Components/GameCard/GameCard';
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
    <div>
      {
        games?.map((game) => (
          <GameCard id={game.id} name={game.name} activite={game.active} createdAt={game.createdAt} updatedAt={game.updatedAt} />
        ))
      }
    </div>
  );
}

export default Index;