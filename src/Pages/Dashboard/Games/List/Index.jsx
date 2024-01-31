import React, { useContext, useEffect, useState } from 'react';
import GameCard from '../../../../Components/GameCard/GameCard';
import './List.scss';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import { API_URL } from '../../../../API_URL';

function Index() {
  const [games, setGames] = useState()
  const [cookies] = useCookies(['accessToken']);
  const [active, setActive] = useState()
  const navigate = useNavigate();
  // const { id } = useSearchParams()
  const { setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);

  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    gameIAP();
  }, [])

  const gameIAP = () => {
    setLoading(true)
    axios.get(`${API_URL === undefined ? '' : API_URL}/games`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + cookies.accessToken
        }
      }
    )
      .then(
        res => {
          setGames(res.data.data)
          setLoading(false)
        }
      )
      .catch(
        err => {
          console.log(err)
        }
      )
  }

  const diactiveCard = (value) => {
    setActive(value)
  }

  const gameSetting = (name) => {
    navigate(`settings/${name}`)
  }

  const gamePlayed = (name) => {
    navigate(`played/${name}`)
  }

  return (
    <div className='gameList row'>
      {
        games?.map((game, index) => (
          <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-ms-12 col-xs-12">
            <GameCard data={game} diactivefun={diactiveCard} settinghandler={gameSetting} palyedhandler={gamePlayed} />
          </div>
        ))
      }
    </div>
  );
}

export default Index;

