import React, { useEffect, useState } from 'react';
import './Navigation.scss';
import imgUseer from '../../Assets/image/photoUser-removebg-preview.png';
import { Link } from 'react-router-dom';

function Navigation() {
  const locale = 'en';
  const [today, setDate] = useState(new Date()); 

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    }
  }, [today]);

  const day = today.toLocaleDateString(locale, { weekday: 'long' });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, { month: 'long' })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${(hour < 12 && 'Morning') || (hour < 17 && 'Afternoon') || 'Evening'}, `;

  const time = today.toLocaleTimeString(locale, { hour: 'numeric', hour12: true, minute: 'numeric' });

  return (
    <div className='navigation'>
      <div className="timeZone">{ date + wish + time}</div>

      <div className="usernameBox">
        <Link to={'admin'} className='username'>User Name</Link>
        <img className='imgUser' src={imgUseer} />
      </div>

    </div>
  );
}

export default Navigation;
