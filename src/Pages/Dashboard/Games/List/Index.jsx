import React, { useContext, useEffect, useRef, useState } from 'react';
import GameCard from '../../../../Components/GameCard/GameCard';
import './List.scss';
import axios from 'axios';
import { Link, useHistory, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from '../../../../Components/Button/Button';
import { useCookies } from 'react-cookie';
import { LoadingContext } from '../../../Loading/LoadingContext';
import { LoginContext } from '../../../Login/LoginContext';
import API_URL from '../../../../API_URL';

function Index() {
  const [games, setGames] = useState()
  const [modal, setModal] = useState(false)
  const [name, setName] = useState()
  const [cookies] = useCookies(['accessToken']);
  const [active, setActive] = useState()
  const navigate = useNavigate();
  const { id } = useSearchParams()
  const { loading, setLoading } = useContext(LoadingContext);
  const { goToLoginPage } = useContext(LoginContext);

  useEffect(() => {
    goToLoginPage(cookies.accessToken);
    gameIAP();
  }, [])

  const gameIAP = () => {
    setLoading(!loading)
    axios.get(API_URL + '/games',
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
          setLoading(loading)
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
    navigate(`settings/${name}`)
  }

  const gamePlayed = () => {
    navigate(`played/${name}`)

  }

  const mouseOut = () => {
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
      <div className={`modalGame ${modal ? 'active' : ''}`} onClick={mouseOut}>
        <div className="modalGameBox">
          <div className="modalGameTitle">{name}</div>
          <div className="btnGameBox">
            <Button title='Settings' className='settingTitle' classnameBtn='settingBtn' handler={() => gameSetting(name)} />
            <Button title='Played' className='playedTitle' classnameBtn='playedBtn' handler={() => gamePlayed(name)} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;

