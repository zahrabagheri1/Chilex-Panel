import React from 'react';
import { Outlet } from 'react-router-dom';

function Game() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default Game;
